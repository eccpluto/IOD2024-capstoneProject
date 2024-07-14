const express = require("express");
const app = express();

// access .env variables
require("dotenv").config();

// connect to database (optionally depends on .env and hence dotenv.config() preceding this)
require("./dbConnect");

app.use(express.json());

// TODO pull in routes
app.get("/", (req, res) => {
    console.log("At server root.");
    res.send({result: 200, data: "at root of server"});
});

// api routes
const routes = require("./routes");
app.use("/api/users", routes.userRoutes);

// typically, as .env would not be provided with source code, we provide a default PORT string
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})