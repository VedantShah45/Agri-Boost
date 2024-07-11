import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { dbConnect } from './database/dbConfig.js'
import userRouter from './routes/userRoute.js'
import farmerRouter from './routes/farmerRoute.js'
import adminRouter from './routes/adminRoute.js'
import messageRoute from './routes/messageRoute.js'
import loginregRouter from './routes/loginregRoute.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express();
config({ path: './config/config.env' });

app.use(cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/api/v1', loginregRouter);
app.use('/api/v1', messageRoute);
app.use('/api/v1/user', authMiddleware, userRouter);
app.use('/api/v1/farmer', authMiddleware, farmerRouter);
app.use('/api/v1/admin', authMiddleware, adminRouter);
app.use('/api/v1/admin', messageRoute);


//Listen to server only when db connected
dbConnect()


export default app;