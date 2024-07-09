import { userModel } from "../models/userModel.js";
import { comparePassword, hashPassword } from '../helpers/passwordHelper.js'
import jwt from 'jsonwebtoken'
import { ReviewModel } from "../models/reviewModel.js"
import { ProductModel } from "../models/productModel.js"
import { CartModel } from "../models/cartModel.js";

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
                id: user._id,
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

// Get all products 
export const getAllProductsController = async (request, response) => {
    try {
        const products = await ProductModel.find({});
        if (!products) {
            return response.status(400).send({
                success: false,
                message: "Products not found"
            });
        }
        response.status(201).send({
            success: true,
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
};

// Get single product
export const getSingleProduct = async (request, response) => {
    try {
        const product = await ProductModel.findById({ _id: request.params.id });
        if (!product) {
            return response.status(400).send({
                success: false,
                message: "Product not found"
            });
        }
        response.status(201).send({
            success: true,
            message: "Product fetched successfully",
            product
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
};

export const postReview = async (req, res) => {
    try {
        const { rating, review } = req.body
        if (!rating && !review) {
            return res.status(401).send({
                success: false,
                message: "Provide either rating or review"
            });
        }
        //Add review and rating
        const tempReview = { rating: rating, review: review }
        tempReview.product = req.params.id
        tempReview.customer = req.headers.user_id
        const prod = await ProductModel.findById(tempReview.product)
        const cust = await userModel.findById(tempReview.customer)
        const seller_id = prod.seller
        const seller = await userModel.findById(seller_id)
        tempReview.seller = seller
        tempReview.productName = prod.name
        tempReview.customerEmail = cust.email
        tempReview.customerName = cust.firstName + " " + cust.lastName
        tempReview.sellerName = seller.firstName + " " + seller.lastName
        const newReview = await ReviewModel.create(tempReview)
        //Update rating for product
        const newRating = (prod.ratingCount * prod.rating + newReview.rating) / (prod.ratingCount + 1)
        const newCount = prod.ratingCount + 1
        const newProduct = await ProductModel.findByIdAndUpdate(prod._id, { rating: newRating, ratingCount: newCount }, { new: true })
        //Send response
        res.send({
            success: true,
            message: `Product rated successfully`,
            product: newProduct,
            review: newReview,
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



// Get user details controller
export const getUsersDetailsController = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await userModel.findById({ _id: id });
        if (!user) {
            return response.status(400).send({
                success: false,
                message: "User not found"
            });
        }
        response.status(201).send({
            success: true,
            message: "User fetched",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                address: user.address,
                dob: user.dob,
                age: user.age,
                answer: user.answer
            }
        })
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
};

export const addToCart = async (req, res) => {
    try {
        const customer = req.headers.user_id
        const productId = req.params.id
        const productObject = await ProductModel.findById(productId)
        const productName = productObject.name
        const quantity = req.body.quantity || 1
        const user = await userModel.findById(customer)
        const customerName = user.firstName + " " + user.lastName
        let testObject = await CartModel.findOne({ customer: customer })
        if (!testObject) {
            let products = []
            products.push({ name: productName, Id: productId, quantity: quantity })
            let amount = 0
            for (let i = 0; i < products.length; i++) {
                const productObject = await ProductModel.findById(products[i].Id)
                amount += productObject.price * quantity
            }
            const cartObject = { customer: customer, products: products, customerName: customerName, amount: amount }
            await CartModel.create(cartObject)
            return res.status(200).send({
                success: true,
                message: "Added to cart",
                cart: cartObject
            })
        }
        else {
            // Check if the product is already in the cart
            const existingProduct = testObject.products.find(p => p.Id.toString() === productId);

            if (existingProduct) {
                // Update the quantity of the existing product
                existingProduct.quantity += quantity;
            } else {
                // Add the new product to the cart
                testObject.products.push({ name: productName, Id: productId, quantity: quantity });
            }
            // Update the total amount
            testObject.amount += productObject.price * quantity;
            await testObject.save()
            return res.status(200).send({
                success: true,
                message: "Added to cart",
                cart: testObject
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const getCart = async (req, res) => {
    try {
        const cartItems = await CartModel.find({ customer: req.headers.user_id })
        res.status(200).send({
            success: true,
            message: "Here is your cart",
            cartItems: cartItems
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        let cart = await CartModel.findOne({ customer: req.headers.user_id })
        let productIndex = cart.products.findIndex(product => product.Id == req.params.id);
        console.log(productIndex);
        if (productIndex !== -1) {
            const productObject = await ProductModel.findById(cart.products[productIndex].Id);

            // Update product quantity in cart
            cart.products[productIndex].quantity--;
            cart.amount -= productObject.price;

            // If quantity is zero, remove product from cart
            if (cart.products[productIndex].quantity === 0) {
                cart.products.splice(productIndex, 1); // Remove product from cart array
            }
        }

        // Save the cart
        await cart.save();
        res.status(200).send({
            success: true,
            message: "Removed from cart",
            cart: cart
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export const getProductReview = async (req, res) => {
    try {
        const productId = req.params.id
        const reviews = await ReviewModel.find({ product: productId })
        if (!reviews) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "No reviews yet"
            });
        }
        res.status(200).send({
            success: true,
            message: "Reviews loaded",
            reviews: reviews
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}