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
    console.log(`Getting Library id: ${req.params.id}`);
    libraryModel.findById(req.params.id)
        .populate('resources')
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
};

const getLibraries = (req, res) => {
    console.log(JSON.stringify(req.params))
    console.log(`Getting Libraries, params: ${JSON.stringify(req.params)}.`);
    if (req.query.owner) {
        libraryModel.findOne({ owner: req.query.owner })
            .populate('resources')
            .then(data => res.send({ result: 200, data: data }))
            .catch(err => res.send({ result: 500, error: err.message }));
    } else {
        console.log("finding all")
        libraryModel.find({})
            .then(data => res.send({ result: 200, data: data }))
            .catch(err => res.send({ result: 500, error: err.message }))
    }
}

const updateLibraryById = (req, res) => {
    console.log(`Updating Library id: ${req.params.id}`);
    libraryModel.findByIdAndUpdate(req.params.id, req.body,
        { new: true },

    )
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
}

const deleteLibraryById = (req, res) => {
    console.log(`Deleting Library id: ${req.params.id}`);
    // passing { new: true } will return the updated record
    libraryModel.findByIdAndDelete(req.params.id, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }));
}

const augmentResources = (req, res) => {
    console.log(`augmenting resources for library: ${req.params.id}`);
    console.log(req.params)
    switch (req.query.augment) {
        case "push":
            console.log('pushing resource to library')
            libraryModel.findOneAndUpdate({ _id: req.params.id },
                {
                    $addToSet: { resources: req.body.resources }
                }, { new: true })
                .populate('resources')
                .then(data => {
                    console.log(data);
                    res.send({ result: 200, data: data })
                }
                )
                .catch(err => res.send({ result: 500, error: err.message }));
            break;
        case "pull":
            console.log(`pulling resource ( ${req.query.resourceId} ) from library`)
            libraryModel.findByIdAndUpdate(
                req.params.id,
                { $pull: { resources: req.query.resourceId } },
                { new: true })
                .populate('resources')
                .then(data => {
                    res.send({ result: 200, data: data })
                    console.log(data)
                })
                .catch(err => res.send({ result: 500, error: err.message }));
            break;
    }
}

const searchResources = (req, res) => {
    console.log(`searching resources for library: ${req.params.id}`);
    console.log(`search term: ${req.query.search}`)
    // we use a regex to match for populated reference docs
    const regex = new RegExp(req.query.search, "i");
    // console.log(regex);
    // get library resources
    libraryModel.findOne({ _id: req.params.id })
        .populate({
            path: 'resources',
            // filter the resources by the search query - only resource name for now
            match: {
                name: regex
            },
        })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => res.send({ result: 500, error: err.message }))
}



module.exports = {
    createLibrary,
    getLibraryById,
    getLibraries,
    updateLibraryById,
    deleteLibraryById,
    augmentResources,
    searchResources,
}