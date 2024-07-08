import mongoose from 'mongoose'

const cartSchema=mongoose.Schema({
    customer:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    products:{
        type:[{name:String,Id:mongoose.Types.ObjectId,quantity:{
            type:Number,
            default:1
        }}],
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

export const CartModel=mongoose.model('cart',cartSchema)