import { registerFarmerController, registerAdminController, registerUserController, loginController, forgotPasswordController, getAllProductsController, getSingleProduct, getProductReview, searchProduct } from '../controllers/userController.js';
import express from 'express'
const router = express.Router()

router.route('/user/register').post(registerUserController)

router.route('/farmer/register').post(registerFarmerController)

router.route('/admin/register').post(registerAdminController)

router.route('/login').post(loginController);

router.get('/reviews/:id', getProductReview)

router.get('/products', getAllProductsController);

router.get('/product/:id', getSingleProduct);

router.route('/forgot-password').put(forgotPasswordController);

router.route('/search').get(searchProduct)

export default router