//controllers contains all the login and connects with the databases

const errorHandler = require("./../middleware/errorHandler");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
exports.getAllContact = (req,res) =>{
    res.status(200).json({
        "message": "Get all contacts",
    });
}

//@desc Create contact
//@route POSt /api/contacts
//@access public
exports.createContact = (req,res) =>{
    console.log(req.body);
    const {name, phone} = req.body;
    if(!name || !phone){
        res.status(400).errorHandler;
        throw new Error("All fields are mandatory");
        //this is done to send the error mesasge in JSON format
    }
    res.status(200).json({
        "message": "Created the contact",
    });
}

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
exports.deleteContact = (req,res) =>{
    res.status(200).json({
        "message": `Deleted the contact ${req.params.id}`,
    });
}

//@desc Update contact
//@route PUT /api/contacts/"id"
//@access public
exports.updateContact =(req,res) =>{
    res.status(200).json({
        "message": `Updated the contact ${req.params.id}`,
    });
}

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
exports.getContact = (req,res) =>{
    res.status(200).json({
        "message": `Got the contact ${req.params.id}`,
    });
}