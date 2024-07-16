const models = require("../models");
const userModel = models.user;


// CRUD operations
const createUser = (req, res) => {
    console.log(`Creating user: ${req.body}`);
    new userModel(req.body).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};

const getUsers = (req, res) => {
    console.log(`Getting all users, with params: ${JSON.stringify(req.query)}`);
    if (req.query.email) {
        // client wants a particular user with the corresponding email
        userModel.findOne({ email: req.query.email, password: req.query.password })
            .then(data => res.send({ result: 200, data: data }))
            .catch(err => res.send({ result: 500, error: err.message }));
    } else
        userModel.find({})
            .then(data => res.send({ result: 200, data: data }))
            .catch(err => res.send({ result: 500, error: err.message }));
};

const getUserById = (req, res) => {
    console.log(`Getting user id: ${req.params.id}.`);
    userModel.findById(req.params.id)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};

const getUserByEmail = (req, res) => {
    console.log(`Getting user email: ${req.params.email}.`);
    userModel.findOne({ email: req.params.email })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};

const updateUserById = (req, res) => {
    console.log(`Updating user id: ${req.params.id}.`);
    // passing { new: true } will return the updated record
    userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};

const deleteUserById = (req, res) => {
    console.log(`Deleting user id: ${req.params.id}.`);
    // passing { new: true } will return the updated record
    userModel.findByIdAndDelete(req.params.id, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
}