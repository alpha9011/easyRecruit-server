const express = require('express');
const connectDB = require('./db/connectDB');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()


const applyMiddleware = require('./middlewares/applymiddleware');
const postjobrouts = require('./routes/PostJob/index');
const candidateForm = require('./routes/CandidateForm/index')
const users = require('./routes/Users/index');
const interviewMessage = require('./routes/InterviewMassege/index');
const paymentGetway = require('./routes/PaymentGetWay/index');
const packs = require('./routes/Packs/index');
const blogs = require('./routes/blog/index')
const feedback = require('./routes/FeedBack/index');
applyMiddleware(app)


app.use(postjobrouts)
app.use(candidateForm)
app.use(users)
app.use(blogs)
app.use(interviewMessage)
app.use(paymentGetway)
app.use(packs)
app.use(feedback)



app.get("/health", (req, res) => {

    res.send('easy recruit in running')
})

app.all("*", (req, res, next) => {
    const error = new Error(`the requested error is invalid:  [${req.url}]`)
    error.status = 404
    next(error)
})
app.use((err, req, res, next) => {
    res.status(err.status || 5000).json({
        message: err.message
    })
})

const main = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log('easy recruit is running on', port);
    })
}
main()