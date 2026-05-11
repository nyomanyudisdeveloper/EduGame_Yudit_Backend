"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authUtils_1 = require("../../utils/authUtils");
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is sent as "Bearer
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = (0, authUtils_1.verifyAccessToken)(token);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map