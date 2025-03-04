import mongoose from "mongoose";

if(!process.env.DB_URL) {
    throw new Error('Please define the MONGO_URL')
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);

        console.log(`Connect is success`);
    } catch (error) {
        console.error('Error connecting to database', error);

        process.exit(1);
    }
}

export default connectToDatabase;