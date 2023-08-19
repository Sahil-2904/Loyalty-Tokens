import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// import userSchema from '../models/userSchema';
// import productSchema from '../models/productSchema';

const connectDB = async () => {
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log('Database Connected Succesfully');
} catch(error) {
    console.log('Error: ', error.message);
}

};

export default connectDB;
