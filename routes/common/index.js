var express = require('express');
var router = express.Router();
router.caseSensitive = true;  //大小写敏感

router.get('/captcha',require('./captcha'))