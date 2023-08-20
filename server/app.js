import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import products from '../client/src/products.js';
import session from 'express-session';
import connectDB from './database/index.js';
import User from './models/userSchema.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Product from "./models/productSchema.js";


const salt = bcrypt.genSaltSync(10);
const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use(session({
    secret: "LongKey",
    resave: false,
    saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        console.log(err);
        done(err, null);
    }
});

passport.use(new LocalStrategy(
    { usernameField: 'email' }, // If your email field is different, adjust this
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
  
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
  
        // if (!bcrypt.compareSync(password, user.password)) {
        //   return done(null, false, { message: 'Incorrect password.' });
        // }
  
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD; 


connectDB(username, password);

const transactions =[];

app.get("/users",async (req,res)=>{
    try{
        const users = await User.find({}).exec();
        res.send(users);
    }catch(error){
        res.send("Error getting users");
    }
})
app.get("/users/:id",async(req,res) => {
    console.log(req.params['id']);
    const id = req.params['id'];
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    res.send(users[id-1]);
})

app.get("/transactions",(req,res) => {
    res.send(transactions);
})
app.post("/transactions",async(req,res) => {
    console.log(req.body);
    transactions.push(req.body);
    const _id = req.body._id;
    const wallet = req.body.wallet;
    const cart = req.body.cart;
    const user = await User.findById(_id);
    user.wallet = wallet;
    user.order.push(cart);   
    console.log(user);
    user.save();
    // r.cart = [];
    // r.wallet = w;
    // const c = req.body.cart.map((obj,index) => obj);
    // const c = req.body.cart.forEach(element => {
    //     return element
    // });
    // r.order.cart.push(req.body.cart);
    // console.log(r);
})
app.get("/products",async (req,res) => {
    try{
        const products = await Product.find({}).exec();
        res.send(products);
    }catch(error){
        res.send("Error getting products");
    }
});
app.get("/products/:id",async(req,res) => {
    try{
        console.log(req.params['id']);
        const id = req.params['id'];
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();
        res.send(products[id-1]);
    }catch(error){
        console.log("Error getting products");
    }
    
})
app.post("/product",async(req,res) => {
    console.log(req.body);
    const pro = req.body;
    const product = new Product(pro);
    const result = await Product.insertMany([pro]);
})

app.post("/signup",async(req,res) => {
    // console.log(req.body);
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const user = users.find((user) => user.email === req.body.email)
    if(!user){  
        res.status(201).json({ message: "User created successfully" });
        const newUser = req.body;
            const user = new User(newUser);
            const result = await User.insertMany([newUser]);
        passport.authenticate('local');
    }
    else{
        res.status(401).json({message:"User Already Exists"});
    }
    
})

app.post("/login",async(req,res) => {
    console.log(req.body);
    const {email,password} = req.body;
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    // const hashedpassword = bcrypt.hashSync(password,salt);
    // console.log(email,hashedpassword,password);
    const user = users.find((user) => user.email === email && user.password === password)
    if(user){
        passport.authenticate('local');
        res.status(200).json({user:user,message:"Login Successful"});
    }
    else{
        res.status(401).json({message:"Invalid Email or Password"});
    }
});
app.post("/logout",async(req,res, next)=>{
    console.log("Logout");
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({message:"Error Logging Out"});
    });   
});




app.listen(3000,(req,res) => {
    console.log("Server running at port 3000");
})




