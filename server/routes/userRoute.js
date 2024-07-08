import express from 'express'
import { forgotPasswordController, getUsersDetailsController, loginController, registerUserController, postReview, getCart, addToCart, removeFromCart } from '../controllers/userController.js';

const router = express.Router();

// Forgot password route
router.put('/forgot-password', forgotPasswordController);

//review endpoint
router.route('/review/:id').post(postReview)

// Get user details
router.get('/me/:id', getUsersDetailsController);

//cart endpoints
router.route('/cart/:id').post(addToCart).delete(removeFromCart)
router.route('/cart').get(getCart)

export default router;