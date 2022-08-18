const express = require("express");
const router = express.Router();
const {registerUser,LoginUser,Getme} = require("./../controllers/UserController.js");

const {Protect} = require("../middleware/authMiddleware");

router.post("/" , registerUser); 
router.post("/login",LoginUser);
router.get("/me",Protect,Getme);




module.exports = router;