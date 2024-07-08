import { registerFarmerController,registerAdminController,registerUserController,loginController,forgotPasswordController } from '../controllers/userController.js';
import express from 'express'
const router=express.Router()

router.route('/user/register').post(registerUserController)

router.route('/farmer/register').post(registerFarmerController)

router.route('/admin/register').post(registerAdminController)

router.route('/login').post(loginController)

router.route('/forgot-password').put(forgotPasswordController);

export default router