const mongoose = require("mongoose");
const connectDB = async () =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("databases connected: ", connect.connection.host, connect.connection.name);
    }
    catch(err){
        console.log(err);
        console.log("\n\n\nERROR");
        process.exit(1);
    }
};
module.exports = connectDB;