import mongoose from 'mongoose'

const reviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        maxlength:5,
    },
    review:{
        type:String,
        maxlength:50,
    },
    response:{
        type:String,
        maxlength:50,
    },
    productName:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    sellerName:{
        type:String,
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    customer:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    seller:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})

export const ReviewModel=mongoose.model('reviews',reviewSchema)