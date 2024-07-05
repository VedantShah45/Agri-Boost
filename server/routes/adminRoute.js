import express from 'express'
import { registerAdminController, getllUsersController, updateCredentialsController, } from '../controllers/userController.js';
import { getAllProducts,deleteAllProducts,getAllReviews,deleteAllReviews } from '../controllers/adminController.js';
const router = express.Router();

// Register user route
router.route('/register').post(registerAdminController).get(getllUsersController);
router.route('/:id').patch(updateCredentialsController)

//review endpoint
router.route('/review').get(getAllReviews).delete(deleteAllReviews)

//product endpoint
router.route('/product').get(getAllProducts).delete(deleteAllProducts)

export default router;