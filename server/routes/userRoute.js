import express from 'express'
import { forgotPasswordController, getUsersDetailsController, loginController, registerUserController, postReview, updateCredentialsController, registerFarmerController, registerAdminController } from '../controllers/userController.js';

const router = express.Router();

// Register user route
router.post('/register/user', registerUserController);

// Register farmer route
router.post('/register/farmer', registerFarmerController);

// Register admin route
router.post('/register/admin', registerAdminController);

// Login user route
router.post('/login', loginController);

// Forgot password route
router.put('/forgot-password', forgotPasswordController);

// Edit profile
router.put('/edit-profile/:id', updateCredentialsController);

//review endpoint
router.route('/review/:id').post(postReview)

// Get user details
router.get('/me/:id', getUsersDetailsController);

export default router;