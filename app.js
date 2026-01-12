const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');


const Listing = require('./models/listing')

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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

// Propeties listing
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find();
    res.render("listing/index", { allListings });
});


app.get("/listings:id")