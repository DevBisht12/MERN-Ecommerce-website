import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './DataBase/config/connectDB.js';
import userRoutes from './Routes/userRouter.js';
import productRoutes from './Routes/allproductRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import paymentRoutes from './Routes/paymentRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017';

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(cookieParser());

// Connect to database
connectDB(DATABASE_URL)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
        process.exit(1); 
    });

// Using routes
app.use('/api/user', userRoutes);
app.use('/api', productRoutes);
app.use('/user', orderRoutes);
app.use('/checkout', paymentRoutes);
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/dist/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
