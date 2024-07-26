const models = require("../models");
const resourceModel = models.resource;


// CRUD operations
const createResource = (req, res) => {
    console.log(`tryint to create new resource: ${JSON.stringify(req.body)}`);
    new resourceModel(req.body).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            // return the existing rescord if duplicate
            if (err.code == 11000) {
                // codify this as SUCCESS_ACCEPTED, and return
                // the already existing resource 
                console.log(`duplicate resource blocked`);
                resourceModel.findOne(req.body)
                    .then(data => res.send({ result: 202, data: data }))
                    .catch(err => res.send({ result: 500, error: err.message }))

            } else // return other errors
                res.send({ result: 500, error: err.message })
        });
};

const getResourceById = (req, res) => {
    console.log(`Getting resource id: ${req.params.id}.`);
    resourceModel.findById(req.params.id)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};

// resources have a relations field which needs special handling for disallowing duplicates
const updateResourceById = (req, res) => {
    console.log(`Updating resource id: ${req.params.id}`);
    resourceModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // attept to only allow unique values to relations array (needs work TODO)
        $addToSet: { relations: { _id: req.body.relations } }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
}

const deleteResourceById = (req, res) => {
    console.log(`Deleting resource id: ${req.params.id}`);
    // passing { new: true } will return the updated record
    resourceModel.findByIdAndDelete(req.params.id, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
}


module.exports = {
    createResource,
    getResourceById,
    updateResourceById,
    deleteResourceById,
}