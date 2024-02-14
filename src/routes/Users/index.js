const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const db = mongoose.connection;
const usersCollection = db.collection('users');

router.get('/users' , async(req, res)=> {
    const cursor = usersCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})

router.get('/users/admin/:email', async(req, res)=> {
    const email = req.params.email
    const query = {email: email}
    const user =  await usersCollection.findOne(query)
    let admin = false
    if(user){
        admin = user?.role === 'admin'
    }
    res.send(admin)
})

router.patch('/users/admin/:id', async (req, res) => {
    const id = req.params.id
    const filter = { _id: new ObjectId(id) }
    const updatedDoc = {
      $set: {
        role: 'admin'
      }
    }
    const result = await usersCollection.updateOne(filter, updatedDoc);
    res.send(result)
  })

router.post( '/users' , async(req,res) => {
    const users = req.body;
    const result = await usersCollection.insertOne(users)
    res.send(result)
})

router.delete('/users/:id', async(req,res)=> {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = usersCollection.deleteOne(query);
    res.send(result)
})

module.exports = router