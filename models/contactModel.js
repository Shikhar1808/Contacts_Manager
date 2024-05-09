const mongoose = require("mongoose");

//this schema will have all the values that we want in our contact
const contactSchema = mongoose.Schema({ //pass an object inside that
    name:{
        type: String,
        required: [true, "Please add the contact name"],
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
        required:[true, "Please add the contact number"],
    },

},{
    timestamps: true,
})
module.exports = mongoose.model("contactSchema",contactSchema);
// we have t export it like this