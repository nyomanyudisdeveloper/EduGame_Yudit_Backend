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
const gameRepo = __importStar(require("./game.repository"));
const getListGames = async () => {
    return await gameRepo.getListGames();
    ;
};
exports.getListGames = getListGames;
const getGameById = async (id) => {
    return await gameRepo.getGameById(id);
};
exports.getGameById = getGameById;
const getListModuleGameById = async (id) => {
    return await gameRepo.getListModuleGameById(id);
};
exports.getListModuleGameById = getListModuleGameById;
const createGameSession = async (gameModuleId, name, deadlineDateFrom, deadlineDateTo, userId) => {
    return await gameRepo.createGameSession(gameModuleId, name, deadlineDateFrom, deadlineDateTo, userId);
};
exports.createGameSession = createGameSession;
const getListGameSessions = async (userId) => {
    return await gameRepo.getListGameSessions(userId);
};
exports.getListGameSessions = getListGameSessions;
const createGameSessionDetail = async (game_session_id, student_name) => {
    return await gameRepo.createGameSessionDetail(game_session_id, student_name);
};
exports.createGameSessionDetail = createGameSessionDetail;
const getGameSession = async (sessionId) => {
    return await gameRepo.getGameSession(sessionId);
};
exports.getGameSession = getGameSession;
const getGameSessionDetail = async (sessionDetailID) => {
    return await gameRepo.getGameSessionDetail(sessionDetailID);
};
exports.getGameSessionDetail = getGameSessionDetail;
const updateGameSessionDetail = async (sessionDetailID, level, score) => {
    return await gameRepo.updateGameSessionDetail(sessionDetailID, level, score);
};
exports.updateGameSessionDetail = updateGameSessionDetail;
const getListGameSessionDetail = async (gameSessionID) => {
    return await gameRepo.getListGameSessionDetail(gameSessionID);
};
exports.getListGameSessionDetail = getListGameSessionDetail;
//# sourceMappingURL=game.service.js.map