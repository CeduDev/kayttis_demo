import { Router } from 'express';
import * as authController from '../controllers/authController';
import { checkAuth } from '../middleware/accessMiddleware';

const router = Router();
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);

router.get('/logout', checkAuth, authController.getLogout);
export default { router };
