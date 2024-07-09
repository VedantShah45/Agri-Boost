import express from 'express'
import { getUsersDetailsController, postReview, updateCredentialsController, addToCart, removeFromCart, getCart, removeWholeItemFromCart } from '../controllers/userController.js';

const router = express.Router();

// Edit profile
router.put('/edit-profile/:id', updateCredentialsController);

//review endpoint
router.route('/review/:id').post(postReview)

// Get user details
router.get('/me/:id', getUsersDetailsController);

//cart endpoints
router.route('/cart/:id').post(addToCart).delete(removeFromCart)
router.route('/cart').get(getCart)
router.delete('/cart/delete/:id', removeWholeItemFromCart);

export default router;