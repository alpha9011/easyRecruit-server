const express = require('express');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts')
// const mongoose = require('mongoose');



const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox





module.exports = router