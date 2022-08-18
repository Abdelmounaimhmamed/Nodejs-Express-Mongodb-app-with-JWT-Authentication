const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000 ;
const {errorHandler} = require("./middleware/errormiddleware");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false})); 

app.use("/api/goals/" , require("./../backend/router/GoalsRoutes"));
app.use(errorHandler);


app.listen(port , () => {
    console.log(`App runing on port ${port}`);
});