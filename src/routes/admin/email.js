const express = require('express');
const { sendEmail } = require('../../controller/admin/email');
const router = express.Router();




router.post('/admin/sendemail',sendEmail);

module.exports = router;



