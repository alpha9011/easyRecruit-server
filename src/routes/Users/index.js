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

router.post( '/users' , async(req,res) => {
    const users = req.body;
    const result = await usersCollection.insertOne(users)
    res.send(result)
})

module.exports = router