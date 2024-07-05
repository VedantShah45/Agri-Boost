import { messageModel } from "../models/messageModel.js";

// Send message controller
export const addMessageController = async (request, response) => {
    try {
        const { firstName, lastName, email, phone, message } = request.body;
        if (!firstName || !lastName || !email || !phone || !message) {
            return response.status(400).send({
                success: false,
                message: "Please fill full form"
            });
        }
        await messageModel.create({
            firstName,
            lastName,
            email,
            phone,
            message
        });
        response.status(200).send({
            success: true,
            message: "Message sent successfully"
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
};

// Get all user messages 
export const getUserMessagesController = async (request, response) => {
    try {
        const { email } = request.body;
        if (!email) {
            return response.status(400).send({
                success: false,
                message: "Please provide email"
            });
        }
        const messages = await messageModel.find({ email: email });
        if (!messages) {
            return response.status(400).send({
                success: false,
                message: "Could not fetch messages"
            });
        }
        response.status(201).send({
            success: true,
            message: "All messages fetched",
            messages
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
};

// Get all messages
export const getAllMessaegesController = async (request, response) => {
    try {
        const messages = await messageModel.find({});
        if (!messages) {
            return response.status(400).send({
                success: false,
                message: "Could not fetch messages"
            });
        }
        response.status(201).send({
            success: true,
            message: "All messages fetched",
            messages
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
};

// Delete message
export const deleteMessageController = async (request, response) => {
    try {
        const id = request.params.id;
        await messageModel.findByIdAndDelete({ _id: id });
        return response.status(200).send({
            success: true,
            message: "Message deleted"
        });
    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
};