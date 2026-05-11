"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = require("./game.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
router.get('/list-games', auth_middleware_1.authMiddleware, game_controller_1.getListGames);
router.get('/session', auth_middleware_1.authMiddleware, game_controller_1.getListGameSessions);
router.get('/sessionDetails/:sessionID', auth_middleware_1.authMiddleware, game_controller_1.getListGameSessionDetail);
router.get('/session/:id', game_controller_1.getGameSession);
router.get('/sessionDetail/:sessionDetailID', game_controller_1.getGameSessionDetail);
router.get('/:id', auth_middleware_1.authMiddleware, game_controller_1.getGameById);
router.get('/:id/modules', auth_middleware_1.authMiddleware, game_controller_1.getListModuleGameById);
router.post('/session', auth_middleware_1.authMiddleware, game_controller_1.createGameSession);
router.post('/sessionDetail', game_controller_1.createGameSessionDetail);
router.put('/sessionDetail/:sessionDetailID', game_controller_1.updateGameSessionDetail);
exports.default = router;
//# sourceMappingURL=game.route.js.map