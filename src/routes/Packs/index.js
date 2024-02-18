const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const db = mongoose.connection;
const packsCollection = db.collection('packs');

// get all packs
router.get('/packs', async (req, res) => {
    const cursor = packsCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})

// get specific pack by id
router.get('/packs/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    const result = await packsCollection.findOne(query)
    res.send(result)
})


module.exports = router