const express = require("express");
const database = require("./mongo"); // Assuming this is your MongoDB collection model
const app = express();
const { body } = require('express-validator');
const cors = require("cors");
require('dotenv').config();
 // Assuming this is your user model

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//AUTHINTICATION APIS ARE REDIRECT FROM THIS ROUTER
const authRouter = require('./routes/auth-router');
app.use('/api', authRouter);



const PORT = process.env.PORT || 8000; // Use the specified port or default to 8000
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
