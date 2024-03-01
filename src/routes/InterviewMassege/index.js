const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const db = mongoose.connection;
const interviewMessageCollection = db.collection('interviewMessage');

// nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});
router.get('/interviewMessage', async(req, res)=> {
    const result = await interviewMessageCollection.find().toArray();
    res.send(result)
})

router.post('/interviewMessage', async (req, res) => {
    const message = req.body;
    // console.log(message);
    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: message.email,
        subject: message.subject,
        text: message.message
    }
    // console.log(mailOptions);

    // sendmail function...
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email sent successfully");
        }
    })
    const result = await interviewMessageCollection.insertOne(message);
    res.send(result)
})

module.exports = router