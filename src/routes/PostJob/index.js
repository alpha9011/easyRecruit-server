const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = mongoose.connection;
const postjobCollection = db.collection('postjob');


router.get('/postjob', async(req, res)=> {
  const cursor = postjobCollection.find()
  const result =await cursor.toArray()
  res.send(result)
})
router.get('/postjob/:id', async (req, res) => {
  const id = req.params.id
  const query = { _id: new ObjectId(id) }
  const result = await postjobCollection.findOne(query)
  res.send(result)
})
router.post('/postjob' , async(req, res) => {
              const bookings = req.body;
              const result = await postjobCollection.insertOne(bookings);
              res.send(result)
            })

module.exports = router