var express = require('express');
var url = require('url');

var router = express.Router();
var routers = express.Router();
router.caseSensitive = true;  //大小写敏感


router.use('/login', require('./login'))
router.use('/api/*', (req, res, next) => {
    let token  = req.cookies.token;
    if(req.session.userinfoToken == token){
        res.cookie("token", token, {maxAge: 1000*60*60,httpOnly: false});
        next()
    }else {
        res.error(0)
    }

})
router.use('/api/userinfo', (req, res) => {
    let userinfo = JSON.parse(req.session.userinfo)
    res.success('', userinfo)
})
router.use('/api', require('./article'))
router.use('/api', require('./classify'))
router.use('/api', require('./upload'))


module.exports = router