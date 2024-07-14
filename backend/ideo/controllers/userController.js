const models = require("../models");
const userModel = models.user;


// CRUD operations
const createUser = (req, res) => {
    console.log(`Creating user: ${req.body}`);
    new userModel(req.body).save()
        .then(data => res.send({result: 200, data: data}))
        .catch(err => res.send({result: 500, error: err.message}));
};

const getUsers = (req, res) => {

};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
}