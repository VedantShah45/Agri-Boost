import express from 'express'
import { loginController, registerUserController } from '../controllers/userController.js';

const router = express.Router();

// Register user route
router.post('/register', registerUserController);

// Login user route
router.post('/login', loginController);

export default router;