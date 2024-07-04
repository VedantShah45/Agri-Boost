import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const userModel = mongoose.model('users', userSchema);