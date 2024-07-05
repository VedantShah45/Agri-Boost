import mongoose from 'mongoose'

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    company :{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    seller:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    sellerName:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    ratingCount:{
        type:Number,
        default:0
    }
},{timestamps:true})

export const ProductModel=mongoose.model('products',ProductSchema);