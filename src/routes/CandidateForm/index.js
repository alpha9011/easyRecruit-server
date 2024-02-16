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



router.get('/applicantCV/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await applicationCollection .findOne(query)
    res.send(result)
  })

router.post('/applicantCV', async (req, res) => {
    const applicants = req.body;
    const result = await applicationCollection.insertOne(applicants)
    res.send(result)
})


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

router.delete('/applicantCV/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await applicationCollection.deleteOne(query);
    res.send(result);
})

module.exports = router