"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.login = exports.getProfile = exports.register = void 0;
const authUtils_1 = require("../../utils/authUtils");
const authService = __importStar(require("./auth.service"));
const register = async (req, res) => {
    const { email, password } = req.body;
    const hashed = await (0, authUtils_1.hashPassword)(password);
    const user = await authService.registerUser(email, hashed);
    res.json(user);
};
exports.register = register;
const getProfile = async (req, res) => {
    const userId = req.userId;
    const user = await authService.findUserById(userId);
    res.json(user);
};
exports.getProfile = getProfile;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.findUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const valid = await (0, authUtils_1.comparePassword)(password, user.password);
    if (!valid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const accessToken = (0, authUtils_1.generateAccessToken)(user.id);
    const refreshToken = (0, authUtils_1.generateRefreshToken)(user.id);
    await authService.createRefreshToken(user.id, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 30 * 24 * 60 * 60 * 1000, path: '/' });
    res.json({ accessToken, user: { id: user.id, email: user.email, fullName: user.fullName } });
};
exports.login = login;
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
        const decoded = (0, authUtils_1.verifyRefreshToken)(refreshToken);
        const stored = await authService.findRefreshToken(refreshToken);
        if (!stored) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        await authService.deleteRefreshToken(refreshToken);
        const newAccessToken = (0, authUtils_1.generateAccessToken)(decoded.userId);
        const newRefreshToken = (0, authUtils_1.generateRefreshToken)(decoded.userId);
        await authService.createRefreshToken(decoded.userId, newRefreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 30 * 24 * 60 * 60 * 1000, path: '/' });
        res.json({ accessToken: newAccessToken });
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};
exports.refreshToken = refreshToken;
const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        await authService.deleteRefreshToken(refreshToken);
        res.clearCookie('refreshToken');
    }
    res.json({ message: "Logged out successfully" });
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map