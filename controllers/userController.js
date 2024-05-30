const asyncHandler = require("express-async-handler");
const errorHandler = require("./../middleware/errorHandler");
const userSchema = require("./../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

//@desc Register the user
//@route POSt /api/users/register
//@access public
exports.registerUser = asyncHandler(async (req,res) => {
    const {username,email,password} = req.body;
    console.log(req.body);
    if(!username || !email || !password){
        console.log("Missing fields")
        res.status(400);
        throw new Error("All form fields are mandatory");
    }
    console.log("Checking")
    const userAvailable = await userSchema.findOne({email});//findOne is a mongoose method to find the first document that matches the query. we passed email as an object to find the user by email
    if(userAvailable){
        console.log("User already exists")
        res.status(400).errorHandler;
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    console.log(`hashed password is ${hashedPassword}`);
    const user = await userSchema.create({
        username,
        email,
        password: hashedPassword,
    })
    console.log("User is created successfully");
    if(user){
        res.status(201).json({
            _id: user._id,
            email: user.email,
        })
    }
    else{
        res.status(400).errorHandler;
        throw new Error("User not created")
    }
    res.status(200).json({
        message: "User registered successfully",
        user,
    })
})

//@desc Login the user
//@route POSt /api/users/login
//@access public
exports.loginUser = asyncHandler(async (req,res) =>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).errorHandler
        throw new Error("All fields are mandatory");
    }
    const user = await userSchema.findOne({email});
    console.log(user);

    //compare passowrd wit hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
        user:{
            username: user.username,
            email: user.email,
            id: user.id,
        }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"})
        //here we provided the user a token to access the data that will expire in 1min
        res.status(200).json({ 
            accessToken
        })
    }
    else{
        res.status(401).errorHandler;
        throw new Error("Invalid Credentials");
    }

    res.status(200).json({
        message: "User logged in successfully",
        // user,
    })
})

//@desc Current user
//@route GET /api/users/register
//@access private
exports.currentUser = asyncHandler(async (req,res) =>{
    // const user = await userSchema.create(req.body);
    res.status(200).json({
        "message": req.user
    })
})

