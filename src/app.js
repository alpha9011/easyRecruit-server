const express = require('express');

const connectDB = require('./db/connectDB');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()









app.get("/health" , (req, res) => {

    res.send('easy recruit in running')
})

app.all("*", (req, res, next)=> {
   const error = new Error(`the requested error is invalid:  [${req.url}]`)
   error.status = 404
   next(error)
})
app.use((err, req, res, next)=> {
    res.status(err.status || 5000).json({
        message: err.message
    })
})

const main =async()=> {
    await connectDB()
    app.listen(port ,() => {
        console.log('easy recruit is running on' , port);
    })
}
main()