import express from 'express'
import { registerAdminController } from '../controllers/userController.js';

const router = express.Router();

// Register user route
router.post('/register', registerAdminController);

export default router;