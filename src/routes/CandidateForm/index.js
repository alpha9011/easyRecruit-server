const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const db = mongoose.connection;
const applicationCollection = db.collection('applicantsdata');

// Get all the applicants
router.get('/applicantCV', async (req, res) => {
    const cursor = applicationCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})


// Get all the applicant who are already selected
router.get('/applicantCV/selected', async (req, res) => {
    const cursor = applicationCollection.find();
    const result = await cursor.toArray();
    const selectedData = result.filter(item => item.isSelected === 'selected');
    res.send(selectedData)
})


// add an applicant to DB
router.post('/applicantCV', async (req, res) => {
    const applicants = req.body;
    const result = await applicationCollection.insertOne(applicants)
    res.send(result)
})

// delete an applicant
router.delete('/applicantCV/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await applicationCollection.deleteOne(query);
    res.send(result);
})

module.exports = router