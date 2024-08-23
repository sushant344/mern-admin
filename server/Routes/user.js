const controller = require("../Controller/user");
const validate = require("../middlewares/validator");
const authMiddleware = require("../middlewares/authMiddleware");
const { signupSchema, loginSchema } = require("../Validators/auth-validator");
const express = require("express");

const Router = express.Router();

// calling validate function to handle inputs validation by using zod --
Router.route("/register").post(validate(signupSchema), controller.register);
Router.route("/login").post(validate(loginSchema), controller.login);
Router.route("/user").get(authMiddleware, controller.user);


module.exports = Router;
