var express = require('express');
var router = express.Router();
var xss = require('xss')
router.caseSensitive = true;  //大小写敏感
var Classify = require('../classify/classify')
var Article = require('../../admin/article/articles')
var Faq = require('../faq/faq')

router.get('/info', (req, res) => {
    Promise.all([
        Classify.count().then(function(c) {
            return c
        }),
        Article.count().then(function(c) {
            return c
        }),
        Faq.count()
    ]).then(rst=>{
        res.success('',{
            classify:rst[0],
            article:rst[1],
            faq:rst[2],
        })
    })

})


module.exports = router