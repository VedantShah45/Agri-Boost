import express from 'express'
import { forgotPasswordController, getUsersDetailsController, postReview, updateCredentialsController, addToCart, removeFromCart, getCart } from '../controllers/userController.js';

const router = express.Router();

// Forgot password route
router.put('/forgot-password', forgotPasswordController);

// Edit profile
router.put('/edit-profile/:id', updateCredentialsController);

//review endpoint
router.route('/review/:id').post(postReview)

// Get user details
router.get('/me/:id', getUsersDetailsController);

//cart endpoints
router.route('/cart/:id').post(addToCart).delete(removeFromCart)
router.route('/cart').get(getCart)

export default router;