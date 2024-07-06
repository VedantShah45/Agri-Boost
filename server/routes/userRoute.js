import express from 'express'
import { forgotPasswordController, getUsersDetailsController, loginController, registerUserController, postReview } from '../controllers/userController.js';

const router = express.Router();

// Register user route
router.post('/register', registerUserController);

// Login user route
router.post('/login', loginController);

// Forgot password route
router.put('/forgot-password', forgotPasswordController);

//review endpoint
router.route('/review/:id').post(postReview)

// Get user details
router.get('/me/:id', getUsersDetailsController);

export default router;