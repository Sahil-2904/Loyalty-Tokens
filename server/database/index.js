import mongoose from 'mongoose';
// import userSchema from '../models/userSchema';
// import productSchema from '../models/productSchema';

const connectDB = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.tmxzp31.mongodb.net/?retryWrites=true&w=majority`;
try {
    mongoose.connect(URL,);
    console.log('Database Connected Succesfully');
} catch(error) {
    console.log('Error: ', error.message);
}

};

export default connectDB;
