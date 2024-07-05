import express from 'express'
import { registerFarmerController } from '../controllers/userController.js';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../controllers/farmerController.js';

const router = express.Router();

// Register user route
router.post('/register', registerFarmerController);
router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').patch(updateProduct).delete(deleteProduct)

export default router;