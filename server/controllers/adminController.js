import { ProductModel } from "../models/productModel.js"
import {ReviewModel} from "../models/reviewModel.js"

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

export const deleteAllProducts=async(req,res)=>{
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

export const getAllReviews=async (req,res)=>{
    try {
        const reviews=await ReviewModel.find({})
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

export const deleteAllReviews=async(req,res)=>{
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