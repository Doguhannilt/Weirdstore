import mongoose from 'mongoose';
import dotenv from 'dotenv';

// .env dosyasını yükle
dotenv.config();

const connectDB = async () => {
    try {
        // .env dosyasından MONGO_URI'yi al
        const mongoURI = "mongodb://mongo:27017/dogu"

        if (!mongoURI) {
            console.error('MONGO_URI environment variable is not set');
            process.exit(1);
        }

        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Successfully connected to the database`);
    } catch (err) {
        console.error("Database Error", err);
        process.exit(1);
    }
}

export default connectDB;
