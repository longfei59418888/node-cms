var express = require('express');
var router = express.Router();
router.caseSensitive = true;  //大小写敏感
var Classify = require('../classify/classify')
var Article = require('../../admin/article/articles')

router.get('/list', (req, res) => {
    let {page = 0, size = 10, classifyId,date,key} = req.query
    if(key){
        // /[\w\d-]*/.test(key)
        Article.findAndCountAll({
            attributes: ['title', 'id', 'description', 'publicDate'],
            limit: parseInt(size),
            include: [Classify],
            offset: parseInt(size) * parseInt(page),
            order: [['createdAt', 'DESC']],
            where:{
                'title': {
                    '$like': '%'+key+'%',          // nick LIKE '%a%'
                    //'$notLike': '%a'         // nick NOT LIKE '%a'
                }
            }
        }).then(rst => {
            res.success('', rst)
        })
        return;
    }
    if(date){
        Article.getTimeList(date,page).then(rst => {
            if (rst.length < 1) {
                res.error(2)
            }
            res.success('', {rows:rst})
        })
        return
    }
    Article.findAndCountAll({
        attributes: ['title', 'id', 'description', 'publicDate'],
        limit: parseInt(size),
        include: [Classify],
        offset: parseInt(size) * parseInt(page),
        order: [['createdAt', 'DESC']],
        where: classifyId ? {
            classifyId,
        } : {}
    }).then(rst => {
        res.success('', rst)
    })
    return;
})


router.get('/:id', (req, res) => {
    let {id} = req.params;
    Article.findById(id,{include: [Classify]}).then(rst => {
        if (rst.length < 1) {
            res.error(2)
        }
        res.success('', rst)
    })
    return
})

module.exports = router