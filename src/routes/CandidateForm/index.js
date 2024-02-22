const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const db = mongoose.connection;
const applicationCollection = db.collection('applicantsdata');

// Get all the applicants
router.get('/applicantCV', async (req, res) => {
   
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
   
    const cursor = applicationCollection.find().skip(page * size).limit(size)
    const result = await cursor.toArray()
    res.send(result)
})

router.get( '/applicantCount', async (req, res) => {
    const count = await applicationCollection.estimatedDocumentCount()
    res.send({count})
})
// Get all the applicant who are already selected
router.get('/applicantCV/selected', async (req, res) => {
    const cursor = applicationCollection.find();
    const result = await cursor.toArray();
    const selectedData = result.filter(item => item.isSelected === 'selected');
    res.send(selectedData)
})



// Get a specific candidate based on id
router.get('/applicantCV/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await applicationCollection.findOne(query)
    res.send(result)
})

// add an applicant to DB
router.post('/applicantCV', async (req, res) => {
    const applicants = req.body;
    const result = await applicationCollection.insertOne(applicants)
    res.send(result)
})


// update a candidate to selected
router.patch('/applicantCV/:id', async (req, res) => {
    const id = req.params.id
    const filter = { _id: new ObjectId(id) }
    const updatedDoc = {
        $set: {
            isSelected: 'selected'
        }
    }
    const result = await applicationCollection.updateOne(filter, updatedDoc);
    res.send(result)
})

// update a candidate to notselected
router.patch('/applicantCV/notSelect/:id', async (req, res) => {
    const id = req.params.id
    const filter = { _id: new ObjectId(id) }
    const updatedDoc = {
        $set: {
            isSelected: 'notselected'
        }
    }
    const result = await applicationCollection.updateOne(filter, updatedDoc);
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