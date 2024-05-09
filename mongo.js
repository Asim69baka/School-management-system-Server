const Mongoose = require('mongoose')
require('dotenv').config();

Mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected")
    }).catch((e) => {
        console.log("Error is " + e)
    })
