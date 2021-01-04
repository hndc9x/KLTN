const express = require('express');
const { sendEmail } = require('../../controller/admin/email');
const { sendEmailPay } = require('../../controller/emailPay');
const router = express.Router();




router.post('/admin/sendemail',sendEmail);

router.post('/endEmailPay',sendEmailPay);

module.exports = router;



