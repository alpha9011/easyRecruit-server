const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
// const postjobCollection = client.db(process.env.DB_NAME).collection('services')
const db = mongoose.connection;
const postjobCollection = db.collection('users');


router.get('/users', async(req, res)=> {
  const cursor = postjobCollection.find()
              const result =await cursor.toArray()
              res.send(result)
})

router.post('/users' , async(req, res) => {
              const user = req.body;
              const result = await postjobCollection.insertOne(user);
              res.send(result)
            })

module.exports = router