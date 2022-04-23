const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://abdev:aB1Dev98@cluster0.ortwu.mongodb.net/code_challenge?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(`CONNECTION TO MONGODB SUCCESS`);
    } catch (e) {
        console.log(`CONNECTION TO MONGODB ERROR, e = ${e}`);
        process.exit(1);
    }
}

module.exports = connectDB;