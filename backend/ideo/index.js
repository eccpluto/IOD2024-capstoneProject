const app = require("./app");

// typically, as .env would not be provided with source code, we provide a default PORT string
// const PORT = 3000;
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})