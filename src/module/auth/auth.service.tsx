import * as authRepository from "./auth.repository"

export const registerUser = async (email: string, password: string) => {
    return await authRepository.registerUser(email, password)
}

export const findUserByEmail = async (email: string) => {
    return await authRepository.findUserByEmail(email)
}

export const findUserById = async (id: string) => {
    return await authRepository.findUserById(id)
}

export const createRefreshToken = async (userId: string, token: string, expires_at: Date) => {
    await authRepository.createRefreshToken(userId, token, expires_at)
}

export const findRefreshToken = async(token:string) => {
    return await authRepository.findRefreshToken(token)
}

export const deleteRefreshToken = async(token:string) => {
    await authRepository.deleteRefreshToken(token)
}