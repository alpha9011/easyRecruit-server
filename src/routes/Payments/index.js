const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const db = mongoose.connection;
const paymentCollection = db.collection('payments');


router.post('/create-payment-intent', async (req, res) => {
    const { price } = req.body;
    // console.log(price);
    const amount = parseInt(price * 100);
    console.log(amount, 'amount inside the intent')

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  });

router.post('/payments' , async(req, res) => {
    const payments = req.body;
    const result = await paymentCollection.insertOne(payments);
    res.send(result)
  })

module.exports = router