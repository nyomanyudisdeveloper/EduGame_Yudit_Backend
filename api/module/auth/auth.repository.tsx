import sql from "../../config/database"


export const registerUser = async (email: string, password: string) => {
    const user = await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${password})
        RETURNING id, email
    `;
    return user[0];
}

export const findUserByEmail = async (email: string) => {
    const user = await sql`
        SELECT id, email, "fullName", password
        FROM users
        WHERE email = ${email}
    `;
    return user[0];
}

export const findUserById = async (id: string) => {
    const user = await sql`
        SELECT id, email, "fullName"  
        FROM users
        WHERE id = ${id}
    `;
    return user[0];
}

export const createRefreshToken = async (userId: string, token: string, expires_at: Date) => {
    await sql`
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES (${userId}, ${token}, ${expires_at})
    `;
}

export const findRefreshToken = async(token:string) => {
    const data = await sql`
        SELECT id 
        FROM refresh_tokens
        WHERE token = ${token}
    `
    return data[0]
}

export const deleteRefreshToken = async(token:string) => {
    await sql`
        DELETE FROM refresh_tokens
        WHERE token = ${token}
    `
}
