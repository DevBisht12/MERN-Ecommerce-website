import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPATIONS={
            dbName:"ecommerce",
        }
        await mongoose.connect(DATABASE_URL,DB_OPATIONS);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export default connectDB;