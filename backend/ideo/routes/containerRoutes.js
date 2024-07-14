const express = require("express");
const Router = express.Router();

const controllers = require("../controllers");
const containerController = controllers.containerController;

// http server methods linking to controller

// create a new Library
Router.post("/create", (req, res) => {
    containerController.createContainer(req, res);
})

// get a Library by Id
Router.get("/:id", (req, res) => {
    containerController.getContainerById(req, res);
})

// update a Library by Id
Router.put("/:id", (req, res) => {
    containerController.updateContainerById(req, res);
})

// delete a Library by Id
Router.delete("/:id", (req, res) => {
    containerController.deleteContainerById(req, res);
})


module.exports = Router;