const express = require("express");
const app = express();
const router = require("./routers");
const cors = require("cors");
const connectDB = require("./connection/db");
const port = 3000;

// connect to db
connectDB();

// cors handler
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/api", router);

// start BE server
app.listen(port, () => {
    console.log(`Server listening on Port = ${port}`);
});