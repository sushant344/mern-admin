const express = require("express");
const controller = require("../Controller/service");

const Router = express.Router();

Router.route("/services")
.get(controller.services);


module.exports = Router;