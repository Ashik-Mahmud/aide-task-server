const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./utils/dbConnection");

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();


// import routes
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");

// apply global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect to database
connectDB();

// define routes
app.use("/api/user", userRouter);

// defines product route
app.use("/api/product", productRouter)


app.get("/", (req, res) => {
  res.redirect(process.env.CLIENT_URL);
});




//export app
module.exports = app;