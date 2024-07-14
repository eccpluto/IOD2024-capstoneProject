const models = require("../models");
const libraryModel = models.library;


// CRUD operations
const createLibrary = (req, res) => {
    console.log(`Creating new Library: ${req.body}`);
    new libraryModel(req.body).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};

const getLibraryById = (req, res) => {
    console.log(`Getting Library id: ${req.params.id}.`);
    libraryModel.findById(req.params.id)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};


const updateLibraryById = (req, res) => {
    console.log(`Updating Library id: ${req.params.id}`);
    libraryModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
}

const deleteLibraryById = (req, res) => {
    console.log(`Deleting Library id: ${req.params.id}`);
    // passing { new: true } will return the updated record
    libraryModel.findByIdAndDelete(req.params.id, req.body, { new: true })
        .then(data => res.send({result: 200, data: data}))
        .catch(err => res.send({result: 500, error: err.message}));
}


module.exports = {
    createLibrary,
    getLibraryById,
    updateLibraryById,
    deleteLibraryById,
}