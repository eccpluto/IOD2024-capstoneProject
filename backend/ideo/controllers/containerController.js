const models = require("../models");
const containerModel = models.container;


// CRUD operations
const createContainer = (req, res) => {
    console.log(`Creating new container: ${req.body}`);
    new containerModel(req.body).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};

const getContainerById = (req, res) => {
    console.log(`Getting container id: ${req.params.id}.`);
    containerModel.findById(req.params.id)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};

const updateContainerById = (req, res) => {
    console.log(`Updating container id: ${req.params.id}`);
    containerModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // attept to only allow unique values to relations array (needs work TODO)
        $addToSet: { relations: { _id: req.body.relations } }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
}

const deleteContainerById = (req, res) => {
    console.log(`Deleting container id: ${req.params.id}`);
    // passing { new: true } will return the updated record
    containerModel.findByIdAndDelete(req.params.id, req.body, { new: true })
        .then(data => res.send({result: 200, data: data}))
        .catch(err => res.send({result: 500, error: err.message}));
}


module.exports = {
    createContainer,
    getContainerById,
    updateContainerById,
    deleteContainerById,
}