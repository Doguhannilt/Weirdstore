import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/dogu")
        console.log(`Successfully connected to the database`)
    } catch (err) {
        console.error("Database Error", err)
        process.exit(1)
    }
}

export default connectDB