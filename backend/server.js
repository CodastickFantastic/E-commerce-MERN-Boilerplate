require("dotenv").config();
require("colors");

const express = require('express');
const connectDB = require('./config/db');
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 8080;

connectDB();

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));


// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

