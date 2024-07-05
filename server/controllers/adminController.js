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