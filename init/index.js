const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');


const mongo_url = "mongodb://127.0.0.1:27017/airbnb"
async function main() {
    await mongoose.connect(mongo_url);
}
main().then(() => {
    console.log("DB connection sucessfull");
}).catch(err => {
    console.log("error: ", err);

})

const initDB = async () => {
    await Listing.deleteMany();
    await Listing.insertMany(initData);
    console.log("DB initialized");
}

initDB();