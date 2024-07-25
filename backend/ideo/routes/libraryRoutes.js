const express = require("express");
const Router = express.Router();

const controllers = require("../controllers");
const libraryController = controllers.libraryController;

// http server methods linking to controller

// create a new Library
Router.post("/create", (req, res) => {
    console.log(req.query)
    libraryController.createLibrary(req, res);
})

// get a Library by Id
Router.get("/:id", (req, res) => {
    console.log(`request sent to get "/:id": ${JSON.stringify(req.query)}`);
    libraryController.getLibraryById(req, res);
})

Router.get("/", (req, res) => {
    console.log(`request sent to get "/": ${JSON.stringify(req.query)}`);
    libraryController.getLibraries(req, res);
})

// update a Library by Id
Router.put("/:id", (req, res) => {
    console.log(`request sent to put "/:id": ${JSON.stringify(req.query)}`);
    libraryController.updateLibraryById(req, res);
})

// delete a Library by Id
Router.delete("/:id", (req, res) => {
    libraryController.deleteLibraryById(req, res);
})

// push or pull resources from a library
//  needs to have the library id, and augment value "push" or "pull"
// to change resource array
Router.put("/:id/resources", (req, res) => {
    libraryController.augmentResources(req, res);
})

Router.get("/:id/resources", (req, res) => {
    libraryController.searchResources(req, res);
})


module.exports = Router;