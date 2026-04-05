import { Request, Response } from "express"
import { comparePassword, generateAccessToken, generateRefreshToken, hashPassword, verifyRefreshToken } from "../../utils/authUtils"
import * as authService from "./auth.service"

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const hashed = await hashPassword(password)
  const user = await authService.registerUser(email, hashed)

  res.json(user)
}

export const getProfile = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const user = await authService.findUserById(userId)
    res.json(user)
}


export const login = async (req: Request, res: Response) => { 
    const { email, password } = req.body

    const user = await authService.findUserByEmail(email)
    if (!user) { 
        return res.status(404).json({ message: "User not found" })
    }
    const valid = await comparePassword(password, user.password)
    if (!valid) {
        return res.status(401).json({ message: "Invalid password" })
    }
    
    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    await authService.createRefreshToken(user.id, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 30 * 24 * 60 * 60 * 1000, path: '/' })

    res.json({ accessToken, user: { id: user.id, email: user.email, fullName: user.fullName } })
}

export const refreshToken = async (req: Request, res: Response) => {
    
    const refreshToken = req.cookies.refreshToken
    
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" })
    }

    try {
        const decoded = verifyRefreshToken(refreshToken) as unknown as { userId: string }
        
        const stored = await authService.findRefreshToken(refreshToken)
        
        if (!stored) {
            return res.status(403).json({ message: "Invalid refresh token" })
        }
        await authService.deleteRefreshToken(refreshToken)

        const newAccessToken = generateAccessToken(decoded.userId)
        const newRefreshToken = generateRefreshToken(decoded.userId)    

        await authService.createRefreshToken(decoded.userId, newRefreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 30 * 24 * 60 * 60 * 1000, path: '/' })

        res.json({ accessToken: newAccessToken })
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" })
    }
}

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    if (refreshToken) {
        await authService.deleteRefreshToken(refreshToken)
        res.clearCookie('refreshToken')
    }
    res.json({ message: "Logged out successfully" })
}