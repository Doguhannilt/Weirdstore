import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI

        if (!MONGO_URI) {
            console.error('MONGO_URI environment variable is not set');
            process.exit(1);
        }

        await mongoose.connect(MONGO_URI);
        console.log(`Successfully connected to the database`);
    } catch (err) {
        console.error("Database Error", err);
        process.exit(1);
    }
}

export default connectDB;
