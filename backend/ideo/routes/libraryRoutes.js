const express = require("express");
const Router = express.Router();

const controllers = require("../controllers");
const libraryController = controllers.libraryController;

// http server methods linking to controller

// create a new Library
Router.post("/create", (req, res) => {
    libraryController.createLibrary(req, res);
})

// get a Library by Id
Router.get("/:id", (req, res) => {
    libraryController.getLibraryById(req, res);
})

Router.get("/", (req, res) => {
    console.log(`request sent to get "/": ${JSON.stringify(req.query)}`);
    libraryController.getLibraries(req, res);
})

// update a Library by Id
Router.put("/:id", (req, res) => {
    libraryController.updateLibraryById(req, res);
})

// delete a Library by Id
Router.delete("/:id", (req, res) => {
    libraryController.deleteLibraryById(req, res);
})


module.exports = Router;