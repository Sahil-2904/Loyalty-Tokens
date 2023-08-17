const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const users = [
    {
        id:"1",
        name:"Sahil",
        email:"sahildhoot.29@gmail.com",
        password:"DE",
        contact:"9146045689",
        cart:[2,6],
        loyalty:"100",
        purchased:[],
        walletadd:""
    },
    {
        id:"2",
        name:"SD",
        email:"s@gmail.com",
        password:"DE",
        contact:"9146045689",
        cart:[4],
        loyalty:"100",
        purchased:[],
        walletadd:""
    }
];


app.post("/login",(req,res) => {
    const {email,password} = req.body;
    console.log(email,password);
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