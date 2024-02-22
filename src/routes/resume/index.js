const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
// const ObjectId = mongoose.Types.ObjectId;
const db = mongoose.connection;
const resumeCollection = db.collection('resume');





router.get('/resumes', async (req, res) => {

    // const email = req.query.email;
    // console.log(email);
    // const query = {'personalInfo.email' : email}
    
    const result = await resumeCollection.find().toArray()
    res.send(result)

});


// Routes
router.post('/resumes', async (req, res) => {

    const resumeData = req.body;
    const result = await resumeCollection.insertOne(resumeData);
    res.send(result)
});

module.exports = router
