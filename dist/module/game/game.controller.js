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
exports.getListGameSessionDetail = exports.updateGameSessionDetail = exports.getGameSessionDetail = exports.getGameSession = exports.createGameSessionDetail = exports.getListGameSessions = exports.createGameSession = exports.getListModuleGameById = exports.getGameById = exports.getListGames = void 0;
const gameService = __importStar(require("./game.service"));
const getListGames = async (req, res) => {
    const result = await gameService.getListGames();
    res.json(result);
};
exports.getListGames = getListGames;
const getGameById = async (req, res) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid id' });
    }
    const result = await gameService.getGameById(id);
    res.json(result);
};
exports.getGameById = getGameById;
const getListModuleGameById = async (req, res) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid id' });
    }
    const result = await gameService.getListModuleGameById(id);
    res.json(result);
};
exports.getListModuleGameById = getListModuleGameById;
const createGameSession = async (req, res) => {
    const userId = req.userId;
    const { gameModuleId, name, deadlineDateFrom, deadlineDateTo } = req.body;
    if (!gameModuleId || !name || !deadlineDateFrom || !deadlineDateTo) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const sessionId = await gameService.createGameSession(gameModuleId, name, deadlineDateFrom, deadlineDateTo, userId);
        res.status(201).json({ id: sessionId });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating game session' });
    }
};
exports.createGameSession = createGameSession;
const getListGameSessions = async (req, res) => {
    const userId = req.userId;
    try {
        const listGameSessions = await gameService.getListGameSessions(userId);
        res.status(201).json(listGameSessions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating game session' });
    }
};
exports.getListGameSessions = getListGameSessions;
const createGameSessionDetail = async (req, res) => {
    const { game_session_id, student_name } = req.body;
    try {
        const sessionDetailID = await gameService.createGameSessionDetail(game_session_id, student_name);
        res.status(201).json({ id: sessionDetailID });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating game session detail' });
    }
};
exports.createGameSessionDetail = createGameSessionDetail;
const getGameSession = async (req, res) => {
    try {
        const { id } = req.params;
        if (typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid id' });
        }
        const gameSessionDetail = await gameService.getGameSession(id);
        res.status(201).json(gameSessionDetail);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating game session' });
    }
};
exports.getGameSession = getGameSession;
const getGameSessionDetail = async (req, res) => {
    try {
        const { sessionDetailID } = req.params;
        if (typeof sessionDetailID !== 'string') {
            return res.status(400).json({ message: 'Invalid sessionDetailID' });
        }
        const listGameSessions = await gameService.getGameSessionDetail(sessionDetailID);
        res.status(201).json(listGameSessions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating game session' });
    }
};
exports.getGameSessionDetail = getGameSessionDetail;
const updateGameSessionDetail = async (req, res) => {
    try {
        const { sessionDetailID } = req.params;
        if (typeof sessionDetailID !== 'string') {
            return res.status(400).json({ message: 'Invalid sessionDetailID' });
        }
        const { level, score } = req.body;
        const listGameSessions = await gameService.updateGameSessionDetail(sessionDetailID, level, score);
        res.status(201).json(listGameSessions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating game session' });
    }
};
exports.updateGameSessionDetail = updateGameSessionDetail;
const getListGameSessionDetail = async (req, res) => {
    try {
        const { sessionID } = req.params;
        if (typeof sessionID !== 'string') {
            return res.status(400).json({ message: 'Invalid sessionID' });
        }
        const listGameSessionDetail = await gameService.getListGameSessionDetail(sessionID);
        res.status(201).json(listGameSessionDetail);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating game session' });
    }
};
exports.getListGameSessionDetail = getListGameSessionDetail;
//# sourceMappingURL=game.controller.js.map