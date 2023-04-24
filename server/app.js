const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());

const login = require("./login/login");
const authToken = require("./middleware/authorization");

app.post("/login", login);
app.post("/encoder/token", authToken);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app