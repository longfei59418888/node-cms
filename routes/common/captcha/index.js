var express = require('express');
var ccap = require('ccap');

var router = express.Router();
router.caseSensitive = true;  //大小写敏感

let captcha;
router.get('/code', (req, res) => {
    if (!captcha) captcha = ccap();
    var ary = captcha.get();
    req.session.vnum = ary[0];
    res.setHeader("Content-Type", "image/jpeg");
    res.end(ary[1]);
})

module.exports = router