const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

// @method Post => register a user 
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;
    // validation 
    if (!name || !email || !password){
        res.status(400); // bad request
        throw new Error("all fieds are required ");
    }
    // check if the user exist 
    const isUserExist = await User.findOne({email});
    if (isUserExist){
        res.status(400);
        throw new Error("User exist with this email");
    } 
    // hash tha password 
    const salt =await  bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    // create user 
    const user = await User.create({name,email,password : hashedPassword});
    if (user){
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            Token : GenerateToken(user._id)
        })
    }else {
        res.status(400);
        throw new Error("Invald user data");
    }
    
});
// login a user || authenticate  
const LoginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if (!user){
        res.status(401)
        throw new Error("any user exist with this email");
    }
    if (user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            Token : GenerateToken(user._id),
            message : "user logged"
        })  
    }
    else {
            res.status(400);
            throw new Error("user not exits");
    }
})

// get data uset  => Private access (private route)
const Getme = asyncHandler(async(req ,res) => {
    const {_id,name,email} = await User.findById(req.user.id);

    res.status(200).json({
        id : _id,
        name : name,
        email : email
    });
})

// generate a jsonwebtoken 
const GenerateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : "30d",
    });
}

module.exports = {
    registerUser,
    LoginUser,
    Getme
};



// midleware => a function that runs during the request response cycle , when we send a request to a route end point the middleware function will be runned and check the token 