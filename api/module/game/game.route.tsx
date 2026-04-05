import {Router} from 'express'
import { createGameSession, createGameSessionDetail, getGameById, getGameSession, getGameSessionDetail, getListGames, getListGameSessionDetail, getListGameSessions, getListModuleGameById, updateGameSessionDetail } from './game.controller';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/list-games' , authMiddleware, getListGames); 
router.get('/session', authMiddleware, getListGameSessions);
router.get('/sessionDetails/:sessionID' , authMiddleware, getListGameSessionDetail);
router.get('/session/:id', getGameSession);
router.get('/sessionDetail/:sessionDetailID', getGameSessionDetail);
router.get('/:id' , authMiddleware, getGameById);
router.get('/:id/modules' , authMiddleware, getListModuleGameById);
router.post('/session', authMiddleware, createGameSession);
router.post('/sessionDetail', createGameSessionDetail);
router.put('/sessionDetail/:sessionDetailID', updateGameSessionDetail)


export default router;