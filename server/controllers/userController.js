import { userModel } from "../models/userModel.js";
import { comparePassword, hashPassword } from '../helpers/passwordHelper.js'
import jwt from 'jsonwebtoken'
import {ReviewModel} from "../models/reviewModel.js"
import { ProductModel } from "../models/productModel.js"

//Show all users
export const getllUsersController = async (req, res) => {
    const users = await userModel.find({})
    res.status(200).send({ users })
}

// Register user controller 
export const registerUserController = async (request, response) => {
    try {
        const { firstName, lastName, email, password, phone, address, dob, age, answer } = request.body;
        if (!firstName || !lastName || !email || !password || !phone || !address || !dob || !age || !answer) {
            return response.status(400).send({
                success: false,
                message: "Please provide all details"
            });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return response.status(400).send({
                success: false,
                message: "User already registered, please login"
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            address,
            dob,
            age,
            answer,
            role: 0
        });
        response.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
};

// Register farmer controller 
export const registerFarmerController = async (request, response) => {
    try {
        const { firstName, lastName, email, password, phone, address, dob, age, answer } = request.body;
        if (!firstName || !lastName || !email || !password || !phone || !address || !dob || !age || !answer) {
            return response.status(400).send({
                success: false,
                message: "Please provide all details"
            });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return response.status(400).send({
                success: false,
                message: "Farmer already registered, please login"
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            address,
            dob,
            age,
            answer,
            role: 1
        });
        response.status(201).send({
            success: true,
            message: "Farmer registered successfully",
            user
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
};

// Register admin controller 
export const registerAdminController = async (request, response) => {
    try {
        const { firstName, lastName, email, password, phone, address, dob, age, answer } = request.body;
        if (!firstName || !lastName || !email || !password || !phone || !address || !dob || !age || !answer) {
            return response.status(400).send({
                success: false,
                message: "Please provide all details"
            });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return response.status(400).send({
                success: false,
                message: "Admin already registered, please login"
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            address,
            dob,
            age,
            answer,
            role: 2
        });
        response.status(201).send({
            success: true,
            message: "Admin registered successfully",
            user
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
};

// Login controller
export const loginController = async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send({
                success: false,
                message: "Please provide all details"
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return response.status(400).send({
                success: false,
                message: "Email not registered, please register"
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return response.status(400).send({
                success: false,
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });
        response.status(201).send({
            success: true,
            message: "Login successfull",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                address: user.address,
                dob: user.dob,
                age: user.age,
                role: user.role
            },
            token
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
};

// Forgot password controller
export const forgotPasswordController = async (request, response) => {
    try {
        const { email, answer, newPassword } = request.body;
        if (!email || !answer || !newPassword) {
            return response.status(400).send({
                success: false,
                message: "Please provide all details"
            });
        }
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return response.status(400).send({
                success: false,
                message: "Invalid email or answer"
            });
        }
        const hashedPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
        response.status(200).send({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
};

//Update user info
export const updateCredentialsController = async (req, res) => {
    try {
        const id = req.params.id
        const user = await userModel.findOneAndUpdate({ _id: id }, req.body)
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User does not exist"
            });
        }
        res.status(200).send({
            success: true,
            message: `User updated successfully`,
            user: user
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const getAllReviews=async (req,res)=>{
    try {
        const reviews=await ReviewModel.find({customer:req.headers.user_id})
        res.send({
            success: true,
            message: `Reviews fetched successfully`,
            review:reviews,
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const postReview=async (req,res)=>{
    try {
        const {rating,review}=req.body
        if(!rating && !review){
            return res.status(401).send({
                success: false,
                message: "Provide either rating or review"
            });
        }
        //Add review and rating
        const tempReview={rating:rating,review:review}
        tempReview.product=req.params.id
        tempReview.customer=req.headers.user_id
        const prod=await ProductModel.findById(tempReview.product)
        const cust=await userModel.findById(tempReview.customer)
        const seller_id=prod.seller
        const seller=await userModel.findById(seller_id)
        console.log(cust,prod,seller_id)
        tempReview.seller=seller
        tempReview.productName= prod.name
        tempReview.customerName= cust.firstName+" "+cust.lastName
        tempReview.sellerName=seller.firstName+" "+cust.lastName
        const newReview=await ReviewModel.create(tempReview)
        //Update rating for product
        const newRating=(prod.ratingCount*prod.rating+newReview.rating)/(prod.ratingCount+1)
        const newCount=prod.ratingCount+1
        const newProduct=await ProductModel.findByIdAndUpdate(prod._id,{rating:newRating,ratingCount:newCount},{new:true})
        //Send response
        res.send({
            success: true,
            message: `Product rated successfully`,
            product:newProduct,
            review:newReview,
        }
        )
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

