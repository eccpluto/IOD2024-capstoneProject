const express = require("express");
const Router = express.Router();

const controllers = require("../controllers");
const userController = controllers.userController;

// http server methods linking to controller

// create a new user
Router.post("/create", (req, res) => {
    userController.createUser(req, res);
})

// get users, and entrypoint into users for email search
Router.get("/", (req, res) => {
    console.log(req.query);
    userController.getUsers(req, res);
})

// get user by id
Router.get("/:id", (req, res) => {
    userController.getUserById(req, res);
})

// update user by Id
Router.put("/:id", (req, res) => {
    userController.updateUserById(req, res);
})

// delete user by Id
Router.delete("/:id", (req, res) => {
    userController.deleteUserById(req, res);
})

module.exports = Router;