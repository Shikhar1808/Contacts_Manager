//controllers contains all the login and connects with the databases
const asyncHandler = require("express-async-handler");
const errorHandler = require("./../middleware/errorHandler");
const contactSchema = require("./../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
exports.getAllContact = asyncHandler(async (req,res) =>{
    const contacts = await contactSchema.find();
    res.status(200).json({
        "message": "success",
        contacts,
    });
})

//@desc Create contact
//@route POSt /api/contacts
//@access public
exports.createContact = asyncHandler(async (req,res) =>{
    console.log(req.body);
    const {name,email, phone} = req.body;
    if(!name || !phone){
        res.status(400).errorHandler;
        throw new Error("All fields are mandatory");
        //this is done to send the error mesasge in JSON format
    }
    const newcontact = await contactSchema.create({
        name,
        email,
        phone,
    })
    res.status(200).json({
        "message": "Created the contact",
        newcontact,
    });
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
exports.deleteContact = asyncHandler(async (req,res) =>{
    const contact = await contactSchema.findById(req.params.id);
    if(!contact){
        res.status(404).send("Contact not found");
        throw new Error("Contact not found");
    }
    const deletedContact = await contactSchema.findByIdAndDelete(req.params.id);
    console.log(deletedContact);
    res.status(200).json({
        "message": `Deleted the contact ${req.params.id}`,
        deletedContact,
    });
})

//@desc Update contact
//@route PUT /api/contacts/"id"
//@access public
exports.updateContact = asyncHandler(async (req,res) =>{
    const contact = await contactSchema.findById(req.params.id);
    if(!contact){
        res.status(404).errorHandler;
        throw new Error("Contact not found");    
    }
    const updateContact = await contactSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    console.log(updateContact);
    res.status(200).json({
        "message": `Updated the contact ${req.params.id}`,
        updateContact,
    });
})

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
exports.getContact = asyncHandler(async (req,res) =>{
    const contact = await contactSchema.findById(req.params.id);
    console.log(contact);
    if(!contact){
        res.status(404).errorHandler;
        throw new Error("Contact not found");    
    }
    res.status(200).json({
        "message": `Got the contact ${req.params.id}`,
        contact,
    });
})