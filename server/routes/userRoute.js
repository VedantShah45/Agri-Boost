import express from 'express'
import { forgotPasswordController, loginController, registerUserController } from '../controllers/userController.js';

const router = express.Router();

// Register user route
router.post('/register', registerUserController);

// Login user route
router.post('/login', loginController);

// Forgot password route
router.put('/forgot-password', forgotPasswordController);

export default router;