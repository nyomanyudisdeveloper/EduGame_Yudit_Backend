import {Router} from 'express'
import * as authController from './auth.controller';
import { authMiddleware } from './auth.middleware';

const router = Router();

router.post('/register', authController.register); 
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);
router.get('/profile', authMiddleware , authController.getProfile);

export default router;