const express = require('express');
const { addTag } = require('../controller/tag');
const router = express.Router();


router.post('/tag/create', addTag);


// router.get('/category/getcategory', getCategories);
// router.post('/category/update', upload.array('categoryImage'), updateCategories);
// router.post('/category/delete', deleteCategories);

module.exports = router;