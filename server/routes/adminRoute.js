import express from 'express'
import { getAllProducts, deleteAllProducts, getAllReviews, deleteAllReviews, deleteProductController, deleteUserController, getAllUsersController } from '../controllers/adminController.js';
import { registerAdminController, getllUsersController, updateCredentialsController } from '../controllers/userController.js';

const router = express.Router();

// Register user route
router.route('/register').post(registerAdminController).get(getllUsersController);
router.route('/:id').patch(updateCredentialsController)

//review endpoint
router.route('/review').get(getAllReviews).delete(deleteAllReviews)

//product endpoint
router.route('/product').get(getAllProducts).delete(deleteAllProducts)

// delete one product
router.delete('/delete-product/:id', deleteProductController);

// Get all users
router.get('/users', getAllUsersController);

// Delete user
router.delete('/delete/:id', deleteUserController);

export default router;