"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListGameSessionDetail = exports.updateGameSessionDetail = exports.getGameSessionDetail = exports.createGameSessionDetail = exports.getGameSession = exports.getListGameSessions = exports.createGameSession = exports.getListModuleGameById = exports.getGameById = exports.getListGames = void 0;
const database_1 = __importDefault(require("../../config/database"));
const getListGames = async () => {
    const games = await (0, database_1.default) `
        SELECT id,name, description, thumbnail_link
        FROM game_master
    `;
    return games;
};
exports.getListGames = getListGames;
const getGameById = async (id) => {
    const game = await (0, database_1.default) `
        SELECT a.id,a.name, a.description, a.thumbnail_link, b.name AS subject_name, c.name AS category_name
        FROM game_master a
        LEFT JOIN subject_master b
        ON a.subject_id = b.id
        LEFT JOIN category_master c
        ON a.category_id = c.id
        WHERE a.id = ${id}
    `;
    return game[0];
};
exports.getGameById = getGameById;
const getListModuleGameById = async (id) => {
    const game = await (0, database_1.default) `
        SELECT b.id, b.name, b.description, b.level, b.thumbnail_link, b.path_game
        FROM game_master a 
        JOIN game_module b
        ON b.game_id = a.id
        WHERE a.id = ${id}
        ORDER BY b.level
    `;
    return game;
};
exports.getListModuleGameById = getListModuleGameById;
const createGameSession = async (gameModuleId, name, deadlineDateFrom, deadlineDateTo, userId) => {
    const session = await (0, database_1.default) `
        INSERT INTO game_session (game_module_id, name, deadline_date_from, deadline_date_to, created_by, updated_by)
        VALUES (${gameModuleId}, ${name}, ${deadlineDateFrom}, ${deadlineDateTo}, ${userId}, ${userId})
        RETURNING id
    `;
    return session[0]?.id;
};
exports.createGameSession = createGameSession;
const getListGameSessions = async (userId) => {
    const listGameSessios = await (0, database_1.default) `
    SELECT CONCAT(c.name,' - ',b.name) as game_name, a.id as game_session_id, 
    a.name as name_session, 
    TO_CHAR(a.deadline_date_from,'FMDD FMMonth YYYY') as deadline_date_from, 
    TO_CHAR(a.deadline_date_to,'FMDD FMMonth YYYY') AS deadline_date_to
    , COUNT(d.*) as total_participant
    FROM game_session a
    JOIN game_module b 
    ON a.game_module_id = b.id
    JOIN game_master c 
    ON b.game_id = c.id
    LEFT JOIN game_session_detail d
    ON a.id = d.game_session_id
    WHERE a.updated_by = ${userId}
    GROUP BY c.name,b.name,a.id , a.name , a.deadline_date_from, a.deadline_date_to
    ORDER BY a.created_at DESC
    `;
    return listGameSessios;
};
exports.getListGameSessions = getListGameSessions;
const getGameSession = async (sessionId) => {
    const sessionDetail = await (0, database_1.default) `
        SELECT b.path_game , CONCAT(c.name,' - ',b.name) as game_name, a.id as game_session_id, 
        a.name as name_session, 
        TO_CHAR(a.deadline_date_from,'FMDD FMMonth YYYY') as deadline_date_from, 
        TO_CHAR(a.deadline_date_to,'FMDD FMMonth YYYY') AS deadline_date_to
        FROM game_session a
        JOIN game_module b 
        ON a.game_module_id = b.id
        JOIN game_master c 
        ON b.game_id = c.id
        WHERE a.id = ${sessionId}
        ORDER BY a.created_at DESC
    `;
    return sessionDetail[0];
};
exports.getGameSession = getGameSession;
const createGameSessionDetail = async (game_session_id, student_name) => {
    const session = await (0, database_1.default) `
        INSERT INTO game_session_detail (game_session_id, student_name, level, score, duration)
        VALUES (${game_session_id},${student_name},1,0,null)
        RETURNING id

    `;
    return session[0]?.id;
};
exports.createGameSessionDetail = createGameSessionDetail;
const getGameSessionDetail = async (sessionDetailID) => {
    const gameSessionDetail = await (0, database_1.default) `
    SELECT student_name, level, score, duration
    FROM game_session_detail
    WHERE id = ${sessionDetailID}
    `;
    return gameSessionDetail[0];
};
exports.getGameSessionDetail = getGameSessionDetail;
const updateGameSessionDetail = async (sessionDetailID, level, score) => {
    const response = await (0, database_1.default) `
        UPDATE game_session_detail
        SET level = ${level}, score = ${score}, updated_at = ${new Date()}
        WHERE id = ${sessionDetailID}
        RETURNING id
    `;
    return response[0];
};
exports.updateGameSessionDetail = updateGameSessionDetail;
const getListGameSessionDetail = async (gameSessionID) => {
    const response = await (0, database_1.default) `
        SELECT a.student_name,level,score,
        ROUND(EXTRACT(HOUR FROM updated_at - created_at)) AS hours,
        ROUND(EXTRACT(MINUTE FROM updated_at - created_at)) AS minutes,
        ROUND(EXTRACT(SECOND FROM updated_at - created_at)) AS seconds
        FROM game_session_detail a
        WHERE a.game_session_id = ${gameSessionID}
    `;
    return response;
};
exports.getListGameSessionDetail = getListGameSessionDetail;
//# sourceMappingURL=game.repository.js.map