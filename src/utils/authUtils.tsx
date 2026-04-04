import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
    throw new Error('ACCESS_SECRET and REFRESH_SECRET must be set');
}

const PORT = process.env.PORT || 3000;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}


export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.ACCESS_SECRET!,
    { expiresIn: "15m" }
  )
}

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_SECRET!,
    { expiresIn: "7d" }
  )
}

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_SECRET!)
  } catch (err) {
    throw new Error("Invalid refresh token")
  }
}

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.ACCESS_SECRET!)
  } catch (err) {
    throw new Error("Invalid access token")
  }
}