const app = require("./app");

// typically, as .env would not be provided with source code, we provide a default PORT string
// process.env.PORT || 8080
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})