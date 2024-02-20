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
      title: updatedjobpost.title,
      location: updatedjobpost.location,
      companyName: updatedjobpost.companyName,
      logo:updatedjobpost.logo,
      aboutCompany: updatedjobpost.aboutCompany,
      benifits: updatedjobpost.benifits,
      positionSummary: updatedjobpost.positionSummary,
      responsibilities: updatedjobpost.responsibilities,
      qualifications: updatedjobpost.qualifications,
      education: updatedjobpost.education,
      jobType: updatedjobpost.jobType,
      experience:updatedjobpost.experience,
      salary: updatedjobpost.salary,
      deadline:updatedjobpost.date
      
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

<<<<<<< HEAD

module.exports = router
=======
module.exports = router
>>>>>>> 9ffe04301a625ee44babc38dd41c67e5caaa1659
