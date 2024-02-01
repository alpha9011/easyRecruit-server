const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const db = mongoose.connection;
const applicationCollection = db.collection('applicantsdata');

router.get('/applicantCV', async (req, res) => {
    const cursor = applicationCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})

router.post('/applicantCV', async (req, res) => {
    const applicants = req.body;
    console.log(applicants);
    const result = await applicationCollection.insertOne(applicants)
    res.send(result)
})

router.delete('/applicantCV/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await applicationCollection.deleteOne(query);
    res.send(result);
})

module.exports = router