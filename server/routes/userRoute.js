import express from 'express'
import { getProductReview, getUsersDetailsController, postReview, updateCredentialsController, addToCart, removeFromCart, getCart } from '../controllers/userController.js';

const router = express.Router();

// Edit profile
router.put('/edit-profile/:id', updateCredentialsController);

//review endpoint
router.route('/review/:id').post(postReview).get(getProductReview)

// Get user details
router.get('/me/:id', getUsersDetailsController);

//cart endpoints
router.route('/cart/:id').post(addToCart).delete(removeFromCart)
router.route('/cart').get(getCart)

export default router;