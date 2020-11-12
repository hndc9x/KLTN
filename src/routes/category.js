const express = require('express');
const { addCategory } = require('../controller/category');
const router = express.Router();

router.post('/category/create',addCategory);

//router.post('/signin',validateSigninRequest,isRequestValidated,signin)

module.exports = router;