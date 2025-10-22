const express = require("express");
const database = require("./src/config/db");
const router = require("./src/routes");
require("dotenv").config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

database.connectToDb();

app.set("view engine", "ejs");


app.get("/user/register", (req, res) => {
  res.render("index", { error: null, success: null });
});


app.use("/", router);

require("./src/jobs");

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`)
});




