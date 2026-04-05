import { verifyAccessToken } from "../../utils/authUtils";

export const authMiddleware = (req: any, res: any, next: any) => {  
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is sent as "Bearer
   
    if (!token) {
        return res.status(401).json({ message: "No token provided" })
    }
    try {
        const decoded = verifyAccessToken(token) as unknown as { userId: string }
        req.userId = decoded.userId
        
        next()
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" })
    }

}