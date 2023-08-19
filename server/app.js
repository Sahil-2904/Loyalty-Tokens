import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import products from '../client/src/products.js';
const salt = bcrypt.genSaltSync(10);
const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

import connectDB from './database/index.js';
import User from './models/userSchema.js';

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD; 


connectDB(username, password);


const transactions =[];

app.get("/",async (req,res)=>{
    
    // console.log(User.db.collections);
    

})

app.get("/users",(req,res) => {
    res.send(users);
})
app.get("/transactions",(req,res) => {
    res.send(transactions);
})
app.post("/transactions",(req,res) => {
    console.log(req.body);
    transactions.push(req.body);
})
app.get("/users/:id",(req,res) => {
    console.log(req.params['id']);
    const id = req.params['id'];
    res.send(users[id-1]);
})
app.post("/signup",async(req,res) => {
    // console.log(req.body);
    const user = users.find((user) => user.email === req.body.email)
    if(!user){
        res.status(201).json({ message: "User created successfully" });
    }
    else{
        res.status(401).json({message:"User Already Exists"});
    }
    const newUser = req.body;
    try {
        const user = new User(newUser);
        const result = await User.insertMany([newUser]);
    
        // await user.save();
        res.send("User created successfully");
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
      }
    // users.push(req.body);
    // console.log(users);
    
    // users = users;
})

app.post("/login",(req,res) => {
    const {email,password} = req.body;
    const hashedpassword = bcrypt.hashSync(password,salt);
    console.log(email,hashedpassword,password);
    const user = users.find((user) => user.email === email && user.password === password)
    if(user){
        res.status(200).json({user:user,message:"Login Successful"});
    }
    else{
        res.status(401).json({message:"Invalid Email or Password"});
        
    }
});



app.listen(3000,(req,res) => {
    console.log("Server running at port 3000");
})