import {Router} from 'express'
import { getGameById, getListGames, getListModuleGameById } from './game.controller';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

router.get('/list-games' , authMiddleware, getListGames); 
router.get('/:id' , authMiddleware, getGameById);
router.get('/:id/modules' , authMiddleware, getListModuleGameById);

export default router;