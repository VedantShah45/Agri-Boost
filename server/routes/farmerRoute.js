import express from 'express'
import { getAllProducts, createProduct, updateProduct, deleteProduct, getAllReviews, deleteReviewController, getProductDetails } from '../controllers/farmerController.js';

const router = express.Router();

//Default endpoint
router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)

router.route('/review/:id').get(getAllReviews).delete(deleteReviewController)
export default router;


