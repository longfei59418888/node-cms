var express = require('express');
var router = express.Router();
router.caseSensitive = true;  //大小写敏感

router.use('/article', require('./article'))
router.use('/classify', require('./classify'))
router.use('/faq', require('./faq'))
router.use('/index', require('./home'))


module.exports = router