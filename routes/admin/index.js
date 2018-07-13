var express = require('express');
var url = require('url');

var router = express.Router();
var routers = express.Router();
router.caseSensitive = true;  //大小写敏感


router.use('/login', require('./login'))
router.use('/api/*', (req, res, next) => {
    next()
})
router.use('/api/userinfo', (req, res) => {
    let userinfo = JSON.parse(req.session.userinfo)
    res.success('', userinfo)
})
router.use('/api', require('./article'))
router.use('/api', require('./classify'))


module.exports = router