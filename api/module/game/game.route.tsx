import {Router} from 'express'
import { createGameSession, createGameSessionDetail, getGameById, getGameSession, getListGames, getListGameSessions, getListModuleGameById } from './game.controller';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/list-games' , authMiddleware, getListGames); 
router.get('/session', authMiddleware, getListGameSessions);
router.get('/session/:id', getGameSession);
router.get('/:id' , authMiddleware, getGameById);
router.get('/:id/modules' , authMiddleware, getListModuleGameById);
router.post('/session', authMiddleware, createGameSession);
router.post('/sessionDetail', createGameSessionDetail);


export default router;