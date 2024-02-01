const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = mongoose.connection;
const postjobCollection = db.collection('postjob');

// get all job post
router.get('/postjob', async (req, res) => {
  const cursor = postjobCollection.find()
  const result = await cursor.toArray()
  res.send(result)
})

// get specific job by id
router.get('/postjob/:id', async (req, res) => {
  const id = req.params.id
  const query = { _id: new ObjectId(id) }
  const result = await postjobCollection.findOne(query)
  res.send(result)
})

// Update a job post
router.put('/postjob/:id', async (req, res) => {
  const id = req.params.id
  const filter = { _id: new ObjectId(id) }
  const options = { upsert: true };
  const updatedjobpost = req.body;
  const jobpost = {
    $set: {
      aboutCompany: updatedjobpost.aboutCompany,
      benifits: updatedjobpost.benifits,
      companyName: updatedjobpost.companyName,
      education: updatedjobpost.education,
      jobType: updatedjobpost.jobType,
      location: updatedjobpost.location,
      positionSummary: updatedjobpost.positionSummary,
      qualifications: updatedjobpost.qualifications,
      responsibilities: updatedjobpost.responsibilities,
      salary: updatedjobpost.salary,
      tags: updatedjobpost.tags,
      title: updatedjobpost.title,
    }
  }
  const result = await postjobCollection.updateOne(filter, jobpost, options)
  res.send(result)
})

// delete job Post
router.delete('/postjob/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await postjobCollection.deleteOne(query);
  res.send(result);
})

// post a job
router.post('/postjob', async (req, res) => {
  const bookings = req.body;
  const result = await postjobCollection.insertOne(bookings);
  res.send(result)
})

module.exports = router