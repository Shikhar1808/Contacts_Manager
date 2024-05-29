const express = require("express");
const contactRouter = require("./routers/contactRoutes");
const userRouter = require("./routers/userRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/dbConncetion");
const dotenv = require('dotenv').config();

const port = process.env.PORT;

connectDB();
const app = express(); //created the express app

app.use(express.json());
//this is a builtIn express middleware that is used the parse the JSON string
app.use("/api/contacts", contactRouter);
//app.use() act as a middleware
app.use("/api/users",userRouter);
app.use(errorHandler)

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
})