const express = require("express");
const app = express();
// const cors = require("cors");

// access .env variables
require("dotenv").config();

// connect to database (optionally depends on .env and hence dotenv.config() preceding this)
require("./dbConnect");

// app.use(cors());
// important middleware for parsing json
app.use(express.json());

// TODO pull in routes
app.get("/", (req, res) => {
    console.log("At server root.");
    res.send({result: 200, data: "at root of server"});
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// api routes
const routes = require("./routes");
app.use("/api/users", routes.userRoutes);
app.use("/api/resources", routes.resourceRoutes);
app.use("/api/libraries", routes.libraryRoutes);
app.use("/api/containers", routes.containerRoutes);

module.exports = app;