import express from 'express'
import { registerAdminController, getllUsersController, updateCredentialsController } from '../controllers/userController.js';

const router = express.Router();

// Register user route
router.route('/register').post(registerAdminController).get(getllUsersController);
router.route('/:id').patch(updateCredentialsController)

export default router;