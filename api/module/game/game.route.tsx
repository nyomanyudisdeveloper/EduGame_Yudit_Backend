import {Router} from 'express'
import { createGameSession, getGameById, getListGames, getListGameSessions, getListModuleGameById } from './game.controller';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/list-games' , authMiddleware, getListGames); 
router.get('/session', authMiddleware, getListGameSessions);
router.get('/:id' , authMiddleware, getGameById);
router.get('/:id/modules' , authMiddleware, getListModuleGameById);
router.post('/session', authMiddleware, createGameSession);


export default router;