import {ProductModel} from "../models/productModel.js"

export const getAllProducts=async (req,res)=>{
    const id=req.headers.id
    const products=await ProductModel.find({seller:id})
    res.json({
        success:true,
        products:products
    })
}

export const createProduct=async (req,res)=>{
    try {
        const {name,description,company,price}=req.body
        if(!name || !description || !company || !price){
            return res.status(400).send('Please enter name, description, company and price of the product')
        }
        const tempProduct=req.body
        tempProduct.seller=req.headers.id
        const newProduct=await ProductModel.create(tempProduct)
        res.json({
            success:true,
            product:newProduct
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const updateProduct=async(req,res)=>{
    try {
        const changes=req.body
        if(!changes){
            return
        }
        const id=req.params.id
        const product=await ProductModel.findOne({_id:id})
        if(!product){
            return res.status(400).send({
                success: false,
                message: "Product doesn't exist"
            })
        }
        if(product.seller!=req.headers.id){
            return res.status(400).send({
                success: false,
                message: "Can't update product"
            })
        }
        const newProduct=await ProductModel.findOneAndUpdate(product,req.body)
        res.status(200).send({
            success:true,
            message:`${newProduct.name} updated`
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const deleteProduct=async(req,res)=>{
    try {
        const changes=req.body
        if(!changes){
            return
        }
        const id=req.params.id
        const product=await ProductModel.findOne({_id:id})
        if(!product){
            return res.status(400).send({
                success: false,
                message: "Product doesn't exist"
            })
        }
        if(product.seller!=req.headers.id){
            return res.status(400).send({
                success: false,
                message: "Can't update product"
            })
        }
        const oldProduct=await ProductModel.findOneAndDelete(product,req.body)
        res.status(200).send({
            success:true,
            message:`${oldProduct.name} deleted`
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}