const express = require("express");
const Router = express.Router();

const controllers = require("../controllers");
const resourceController = controllers.resourceController;

// http server methods linking to controller

// create a new resource
Router.post("/create", (req, res) => {
    resourceController.createResource(req, res);
})

// get a resource by Id
Router.get("/:id", (req, res) => {
    resourceController.getResourceById(req, res);
})

// update a resource by Id
Router.put("/:id", (req, res) => {
    resourceController.updateResourceById(req, res);
})

// delete a resource by Id
Router.delete("/:id", (req, res) => {
    resourceController.deleteResourceById(req, res);
})


module.exports = Router;