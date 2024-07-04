import mongoose from "mongoose";
import 'colors'

export const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "farmerwebsite"
    }).then(() => {
        console.log(`Connected to database`.bgGreen.white);
    }).catch(error => {
        console.log(`Could not connect to database: ${error}`.bgRed.white);
    })
};