const express = require("express");
const controller = require("../Controller/admin-controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const Router = express.Router();

// if logged in user is admin then only can access following data --
Router.route("/users").get(authMiddleware, adminMiddleware, controller.getAllUsers);
Router.route("/users/:id").get(authMiddleware, adminMiddleware, controller.getUserById);
Router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, controller.updateUserById);
Router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, controller.deleteUserById);
Router.route("/contacts").get(authMiddleware, adminMiddleware, controller.getAllContacts);
Router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, controller.deleteContactById);


module.exports = Router;