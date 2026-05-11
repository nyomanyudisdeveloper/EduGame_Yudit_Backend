export declare const registerUser: (email: string, password: string) => Promise<import("postgres").Row | undefined>;
export declare const findUserByEmail: (email: string) => Promise<import("postgres").Row | undefined>;
export declare const findUserById: (id: string) => Promise<import("postgres").Row | undefined>;
export declare const createRefreshToken: (userId: string, token: string, expires_at: Date) => Promise<void>;
export declare const findRefreshToken: (token: string) => Promise<import("postgres").Row | undefined>;
export declare const deleteRefreshToken: (token: string) => Promise<void>;
//# sourceMappingURL=auth.service.d.ts.map