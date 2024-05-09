const express = require("express");
const router = require("./routers/contactRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/dbConncetion");
const dotenv = require('dotenv').config();

const port = process.env.PORT;

connectDB();
const app = express(); //created the express app

app.use(express.json());
//this is a builtIn express middleware that is used the parse the JSON string
app.use("/", router)
//app.use() act as a middleware

app.use(errorHandler)

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
})