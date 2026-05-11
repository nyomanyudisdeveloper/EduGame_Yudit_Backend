import jwt from "jsonwebtoken";
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
export declare const generateAccessToken: (userId: string) => string;
export declare const generateRefreshToken: (userId: string) => string;
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
export declare const verifyAccessToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=authUtils.d.ts.map