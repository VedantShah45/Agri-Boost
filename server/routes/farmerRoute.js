import express from 'express'
import { registerFarmerController } from '../controllers/userController.js';

const router = express.Router();

// Register user route
router.post('/register', registerFarmerController);

export default router;