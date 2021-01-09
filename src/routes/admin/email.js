const express = require('express');
const { sendEmail } = require('../../controller/admin/email');
const { sendEmailPay, sendEmailOrder } = require('../../controller/emailPay');
const router = express.Router();




router.post('/admin/sendemail',sendEmail);

router.post('/endEmailPay',sendEmailPay);

router.post('/endEmailOrder',sendEmailOrder);

module.exports = router;



