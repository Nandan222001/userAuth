const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.DATABASE_URL;

const dbConnect = () => {
    mongoose.connect(url)
    .then(() => {
        console.log("Database Connected Succesfully !!! ");
    })
    .catch((error) => {
        console.log("Database Connection Failed !!! ");
        console.log(error.message);
        process.exit;
    })
}

module.exports = {dbConnect};