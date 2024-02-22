const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = mongoose.connection;
const blogCollection = db.collection('blog');



// get specific job by id
router.get('/blog/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await blogCollection.findOne(query)
    res.send(result)
  })
  

// get all job post
router.get('/blogs', async (req, res) => {
    const result = await blogCollection.find().toArray()
    res.send(result)
  })

// post a job
router.post('/blogs', async (req, res) => {
    const blogs = req.body;
    const result = await blogCollection.insertOne(blogs);
    res.send(result)
  })




// Update a job post
router.put('/blog/:id', async (req, res) => {
  const id = req.params.id
  const filter = { _id: new ObjectId(id) }
  
  const updateBlog = req.body;
  const updatedBDoc = {
    $set: {
      title: updateBlog.title,
      name: updateBlog.name,
      blogImage: updateBlog.title,
      description: updateBlog.description,
      date: updateBlog.date,
    }
  }
  const result = await blogCollection.updateOne(filter, updatedBDoc)
  res.send(result)
})


// delete job Post
router.delete('/blog/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await blogCollection.deleteOne(query);
    res.send(result);
  })
  
module.exports = router
