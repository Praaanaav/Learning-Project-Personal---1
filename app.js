const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const port = 8080;

// Mongoose connection
const mongo_url = "mongodb://127.0.0.1:27017/airbnb"
async function main() {
    await mongoose.connect(mongo_url);
}
main().then(() => {
    console.log("DB connection sucessfull");
}).catch(err => {
    console.log("error: ", err);

})

// starting app
app.listen(port, () => {
    console.log("server is running");
})

// Root page
app.get("/", (req, res) => {
    res.send("Hey I am Pranav")
})