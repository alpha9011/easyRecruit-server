const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = mongoose.connection;
const feedbackCollection = db.collection('feedback');


// post a feedback
router.post('/feedback', async (req, res) => {
    const feedbackInfo = req.body;
    const result = await feedbackCollection.insertOne(feedbackInfo);
    res.send(result)
})

// get all posted feedback
router.get('/feedback', async (req, res) => {
    const cursor = feedbackCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})

// get specific feedback by id
router.get('/feedback/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await feedbackCollection.findOne(query)
    res.send(result)
})

// post a feedback
router.post('/feedback', async (req, res) => {
    const feedbackInfo = req.body;
    const result = await feedbackCollection.insertOne(feedbackInfo);
    res.send(result)
})



module.exports = router
