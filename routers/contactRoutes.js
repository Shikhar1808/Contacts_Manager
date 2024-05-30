const express = require("express");
const router = express.Router();
const contactController = require("./../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/")
.get(contactController.getAllContact)
.post(contactController.createContact);
//this is how to define a route

router.route("/:id")
.put(contactController.updateContact)
.delete(contactController.deleteContact)
.get(contactController.getContact);//router for getting the individual contact

module.exports = router;