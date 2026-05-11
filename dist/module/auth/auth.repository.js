"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRefreshToken = exports.findRefreshToken = exports.createRefreshToken = exports.findUserById = exports.findUserByEmail = exports.registerUser = void 0;
const database_1 = __importDefault(require("../../config/database"));
const registerUser = async (email, password) => {
    const user = await (0, database_1.default) `
        INSERT INTO users (email, password)
        VALUES (${email}, ${password})
        RETURNING id, email
    `;
    return user[0];
};
exports.registerUser = registerUser;
const findUserByEmail = async (email) => {
    const user = await (0, database_1.default) `
        SELECT id, email, "fullName", password
        FROM users
        WHERE email = ${email}
    `;
    return user[0];
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
    const user = await (0, database_1.default) `
        SELECT id, email, "fullName"  
        FROM users
        WHERE id = ${id}
    `;
    return user[0];
};
exports.findUserById = findUserById;
const createRefreshToken = async (userId, token, expires_at) => {
    await (0, database_1.default) `
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES (${userId}, ${token}, ${expires_at})
    `;
};
exports.createRefreshToken = createRefreshToken;
const findRefreshToken = async (token) => {
    const data = await (0, database_1.default) `
        SELECT id 
        FROM refresh_tokens
        WHERE token = ${token}
    `;
    return data[0];
};
exports.findRefreshToken = findRefreshToken;
const deleteRefreshToken = async (token) => {
    await (0, database_1.default) `
        DELETE FROM refresh_tokens
        WHERE token = ${token}
    `;
};
exports.deleteRefreshToken = deleteRefreshToken;
//# sourceMappingURL=auth.repository.js.map