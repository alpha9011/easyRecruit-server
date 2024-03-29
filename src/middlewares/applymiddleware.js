const cors = require('cors');
const express = require('express');
require('dotenv').config()
const  cookieParser = require('cookie-parser');
const applyMiddleware = (app) => {
    // middleware
    app.use(cors({
        origin: [process.env.LOCAL_CLIENT],
        credentials: true
    }))

    app.use(express.json())
    app.use(cookieParser())

}

module.exports = applyMiddleware