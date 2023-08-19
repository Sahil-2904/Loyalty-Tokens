import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';

const salt = bcrypt.genSaltSync(10);
const app = express();

app.use(cors());
app.use(bodyParser.json());

import connectDB from './database/index.js';
import User from './models/userSchema.js';

connectDB();


let users = [
    {
        id:"1",
        name:"Sahil",
        email:"sahildhoot.29@gmail.com",
        password:"$2a$10$kXTCghQ9zmV7bu5AQO5EduGG1XTl7c.16vB1l8wRXdjNFzQ4EB4bu",
        contact:"9146045689",
        cart:[{id:2,quantity:1},{id:6,quantity:1}],
        loyalty:"100",
        purchased:[],
        walletadd:"0x"
    },
    {
        id:"2",
        name:"SD",
        email:"s@gmail.com",
        password:"DE",
        contact:"9146045689",
        cart:[{id:4,quantity:1}],
        loyalty:"100",
        purchased:[],
        walletadd:"0x"
    },
    {
        id:"3",
        name:"S",
        email:"d@gmail.com",
        password:"$2a$10$kXTCghQ9zmV7bu5AQO5EduGG1XTl7c.16vB1l8wRXdjNFzQ4EB4bu",
        contact:"9146045689",
        cart:[],
        loyalty:"100",
        purchased:[],
        walletadd:"0x"
    }
];
const transactions =[];

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
app.post("/signup",(req,res) => {
    // console.log(req.body);
    const user = users.find((user) => user.email === req.body.email)
    if(!user){
        res.status(201).json({ message: "User created successfully" });
    }
    else{
        res.status(401).json({message:"User Already Exists"});
    }
    users.push(req.body);
    console.log(users);
    
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
})
app.listen(3000,(req,res) => {
    console.log("Server running at port 3000");
})