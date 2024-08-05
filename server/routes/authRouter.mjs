import authController from '../controllers/authController.mjs'
import { verifyUser } from '../middlewares/auth.mjs'
import { validateSignup, validateLogin } from '../middlewares/authValidation.mjs'; 
import { Router } from "express";
const router = Router();

router.post('/auth/signup', validateSignup, authController.signup);
router.post('/auth/login', validateLogin, authController.login);
router.post('/auth/logout', verifyUser, authController.logout);

export default router;