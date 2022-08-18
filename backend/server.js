const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000 ;
const {errorHandler} = require("./middleware/errormiddleware");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended : false})); 

app.use("/api/goals/" , require("./../backend/router/GoalsRoutes"));
app.use(errorHandler);


app.listen(port , () => {
    console.log(`App runing on port ${port}`);
});