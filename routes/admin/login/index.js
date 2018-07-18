var express = require('express');
var cryptos = require('../../../utils/cryptos')
var router = express.Router();
router.caseSensitive = true;  //大小写敏感


router.post('/register',(req,res)=>{

})


router.post('/login', (req, res) => {
    let {username, password, vnum} = req.body;
    let sessionVnum = req.session.vnum;
    if (sessionVnum != vnum) {
        res.error(20000, '验证码错误！')
        return
    }
    if(req.session.loginErrorNum>5){
        res.error(20000, '登陆错误过多，请一个小时后再试！')
        return
    }
    if (username == 'test' && password == '123456') {
        let token = cryptos.getSha1(
            JSON.stringify({username,password,time:new Date().getTime()})
        )
        res.cookie("token", token, {maxAge: 1000*60*60,httpOnly: false}); //, signed: true
        req.session.userinfoToken = token;
        res.success('登陆成功！',
            Object.assign({token},req.body)
        )
        req.session.loginErrorNum = 0;
        req.session.userinfo = JSON.stringify({username,password});
        return
    }else {
        if(req.session.loginErrorNum) req.session.loginErrorNum +=1
        else req.session.loginErrorNum = 1
        res.error(20000, '账号或者密码错误！')
        return
    }
})

module.exports = router