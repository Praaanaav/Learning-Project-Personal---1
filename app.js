const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');


const Listing = require('./models/listing');
const { log } = require('console');

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

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

// Add new property
app.get("/listings/new", (req, res) => {
    res.render("listing/new.ejs");
})

app.post("/listings", async(req, res) => {
    const newlisting = new Listing(req.body.listing)
    console.log(newlisting);
    await newlisting.save()
    res.redirect("/listings")

})

// Shoow routes
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show", { listing });
})

