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
    }
},{timestamps:true})

export const ProductModel=mongoose.model('products',ProductSchema);