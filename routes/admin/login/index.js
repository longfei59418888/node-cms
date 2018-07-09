var express = require('express');

var router = express.Router();
router.caseSensitive = true;  //大小写敏感


router.post('/register',(req,res)=>{

})

router.post('/login', (req, res) => {
    let {userName, password, vnum} = req.body;
    let sessionVnum = req.session.vnum;
    if (sessionVnum != vnum) {
        res.error(0, '验证码错误！')
        return
    }
    if(req.session.loginErrorNum>5){
        res.error(0, '登陆错误过多，请一个小时后再试！')
        return
    }
    if (userName == 'xiaolongwang' && password == '594!xiaolong') {
        res.success('登陆成功！',{})
        return
    }else {
        if(req.session.loginErrorNum) req.session.loginErrorNum +=1
        else req.session.loginErrorNum = 1
        res.error(0, '账号或者密码错误！')
        return
    }
})

module.exports = router