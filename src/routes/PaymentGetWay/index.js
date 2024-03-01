const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SSLCommerzPayment = require('sslcommerz-lts')
const ObjectId = mongoose.Types.ObjectId
const db = mongoose.connection;
const orderCollection = db.collection('orders');
const packsCollection = db.collection('packs');


const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox

// transiction Id
const tran_id = new ObjectId().toString();


router.post('/order', async (req, res) => {
    const order = req.body;
    // console.log(order);

    // find the pack which on is going to be pay
    const id = req.body.id
    const query = { _id: new ObjectId(id) }
    const pack = await packsCollection.findOne(query)
    // console.log(pack);
    // https://easy-recruit-server.vercel.app
    const data = {
        total_amount: pack?.price,
        currency: 'USD',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:5000/payment/success/${tran_id}`,
        fail_url: `http://localhost:5000/payment/fail/${tran_id}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: pack?.pack_name,
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: order?.name,
        cus_email: order?.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    // console.log(data);


    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    try {
        const apiResponse = await sslcz.init(data); // Await for the initialization response
        const GatewayPageURL = apiResponse.GatewayPageURL;

        // Save order details to the database
        const finalOrder = {
            pack,
            paidStatus: false,
            transactionId: tran_id,
        };
        await orderCollection.insertOne(finalOrder);

        // Redirect the user to the payment gateway
        res.send({ url: GatewayPageURL });
        console.log('Redirecting to:', GatewayPageURL);
    } catch (error) {
        console.error('Error initializing SSLCommerz:', error);
        res.status(500).send('Internal Server Error');
    }

})


// update data when clicked on the success button
router.post('/payment/success/:tranId', async (req, res) => {
    console.log(req.params.tranId);
    const result = await orderCollection.updateOne(
        { transactionId: req.params.tranId },
        {
            $set: {
                paidStatus: true
            }
        }
    );
    if (result.modifiedCount > 0) {
        res.redirect(`http://localhost:5173/payment/success/${req.params.tranId}`)
    }
})

// https://brilliant-crisp-888e1f.netlify.app
// delete data when clicked on the failed button
router.post('/payment/fail/:tranId', async (req, res) => {
    console.log(req.params.tranId);
    const result = await orderCollection.deleteOne(
        { transactionId: req.params.tranId });
    if (result.deletedCount > 0) {
        res.redirect(`http://localhost:5173/payment/fail/${req.params.tranId}`)
    }
})




module.exports = router