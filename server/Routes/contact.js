const controller = require("../Controller/contact");
const express = require("express");

const Router = express.Router();


Router.route("/contact")
.post(controller.contact)


module.exports = Router;