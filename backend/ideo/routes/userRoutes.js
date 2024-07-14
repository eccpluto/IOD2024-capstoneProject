const express = require("express");
const Router = express.Router();

const controllers = require("../controllers");
const userController = controllers.userController;

// http server methods linking to controller
Router.post("/create", (req, res) => {
    userController.createUser(req, res);
})

module.exports = Router;