const express = require("express");
const router = express.Router();
const contactController = require("./../controllers/contactController");

router.route("/api/contacts")
.get(contactController.getAllContact)
.post(contactController.createContact);
//this is how to define a route

router.route("/api/contacts/:id")
.put(contactController.deleteContact)
.delete(contactController.updateContact)
.get(contactController.getContact);//router for getting the individual contact

module.exports = router;