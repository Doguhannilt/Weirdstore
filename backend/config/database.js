import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_TEST)
        console.log(`Successfully connected to the database`)
    } catch (err) {
        console.error("Database Error", err)
        process.exit(1)
    }
}

export default connectDB