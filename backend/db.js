// require("dotenv").config();

// const mongoose = require('mongoose');

// const mongoURI = process.env.MONGO_URI
// const connectToMongo = async () => {
//     await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
// }

// module.exports = connectToMongo;
require("dotenv").config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        // console.log("Connected to Mongo Successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = connectToMongo;
