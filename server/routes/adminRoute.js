import express from 'express'
import { registerAdminController, getllUsersController, updateCredentialsController } from '../controllers/userController.js';
import { deleteUserController, getAllUsersController } from '../controllers/adminController.js';

const router = express.Router();

// Register user route
router.route('/register').post(registerAdminController).get(getllUsersController);
router.route('/:id').patch(updateCredentialsController)

// Get all users
router.get('/users', getAllUsersController);

// Delete user
router.delete('/delete/:id', deleteUserController);

export default router;