const mongoose = require("mongoose");

require("dotenv").config();
const database = process.env.MONGODB_URI

const connectToDb = () => {
    mongoose.connect(database);

    mongoose.connection.on("connected", () => {
        console.log("Connected to database successfully")
    });
    mongoose.connection.on("error", () => {
        console.log("Failed to connect to database please try again")
    });
};

module.exports = {connectToDb};