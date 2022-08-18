const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("./../models/UserModel");

const Protect = asyncHandler(async (req,res,next) => {
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header 
            token = req.headers.authorization.split(' ')[1];
            // verify token 
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // GEt user from the token 
            req.user = await User.findById(decoded.id).select("-password");
            next() ; // the end of the middleware 
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error("not authorized")
        }
    }
    if (!token){
        res.status(400);
        throw new Error('not authorized , there is no token ');
    }
});


module.exports = {Protect};