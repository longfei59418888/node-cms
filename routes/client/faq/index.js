var express = require('express');
var router = express.Router();
var xss = require('xss')
router.caseSensitive = true;  //大小写敏感
var util = require('../../../utils')
var Faq = require('./faq')
var Reply = require('./reply')

router.get('/list/:id', (req, res) => {
    let id = req.params.id;

})

router.post('/save', (req, res) => {
    let {articleId, name = '', content} = req.body;
    if(!content || content.length<1){
        res.error(2)
        return
    }
    Faq.add(articleId,name,content).then((rst)=>{
       if(rst){
           res.success('评论成功！',rst)
           return
       }
        res.error(20000,'评论失败！')
    })
})

router.post('/reply/:id', (req, res) => {
    let id = req.params.id;

})

module.exports = router