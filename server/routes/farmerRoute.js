import express from 'express'
import { registerFarmerController } from '../controllers/userController.js';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getAllReviews, deleteReviewController } from '../controllers/farmerController.js';

const router = express.Router();

// Register user route
router.post('/register', registerFarmerController);
//Default endpoint
router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').patch(updateProduct).delete(deleteProduct)

router.route('/review/:id').get(getAllReviews).delete(deleteReviewController)
export default router;


