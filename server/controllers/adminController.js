import { ProductModel } from "../models/productModel.js"
import { ReviewModel } from "../models/reviewModel.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({})
        res.json({
            success: true,
            products: products
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const deleteAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.deleteMany({})
        res.json({
            success: true,
            products: products
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find({})
        res.send({
            success: true,
            message: `Reviews fetched successfully`,
            review: reviews,
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const deleteAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.deleteMany({})
        res.json({
            success: true,
            reviews: reviews
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}
import { userModel } from '../models/userModel.js'

// Get all users
export const getAllUsersController = async (request, response) => {
    try {
        const users = await userModel.find({});
        if (!users) {
            return response.status(400).send({
                success: false,
                message: "No users found"
            });
        }
        response.status(201).send({
            success: true,
            message: "All users fetched successfully",
            users
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
};

// Delete user
export const deleteUserController = async (request, response) => {
    try {
        const id = request.params.id;
        await userModel.findByIdAndDelete({ _id: id });
        response.status(201).send({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

// Delete product 
export const deleteProductController = async (request, response) => {
    try {
        const id = request.params.id;
        await ProductModel.findByIdAndDelete({ _id: id });
        response.status(200).send({
            success: true,
            message: "Product deleted"
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}