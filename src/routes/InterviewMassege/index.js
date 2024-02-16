const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const db = mongoose.connection;
const interviewMessageCollection = db.collection('interviewMessage');

router.post('/interviewMessage', async (req, res) => {
    const message = req.body;
    const result = await interviewMessageCollection.insertOne(message);
    res.send(result)
})

module.exports = router