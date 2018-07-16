var express = require('express');
var router = express.Router();
var util = require('../../../utils')
var Article = require('./articles')

router.caseSensitive = true;  //大小写敏感

router.post('/article/:id', (req, res) => {
    let {title, content, state, isPublish, username} = req.body;
    if (title.length < 1) {
        res.error(2)
        return
    }
    if (util.hasScript(title)) {
        res.error(20001)
        return
    }
    Article.findOrCreate({
        where: {title: title},
        defaults: {title, content, state, isPublish, username}
    })
        .then((rst) => {
            if (rst[1]) {
                res.success('创建成功！', res[0].dataValues)
                return
            }
            res.error(2, '文章名称已存在！')
        })
})


router.delete('/article', (req, res) => {
    let {id} = req.query
    if (!id) {
        res.error(2)
        return;
    }
    Article.destroy({
        where: {id: id}
    }).then(rst => {
        res.success('', rst)
    })
})


router.get('/article/:id', (req, res) => {
    let {page, size} = req.body
    size = size ? size : 10
    page = page ? page : 0

    Article.findAndCountAll({
        limit: size,
        offset: size * page
    }).then(rst => {
        res.success('', rst)
    })
})

router.post('/article/:id', (req, res) => {
    let {title, content, state, isPublish, username, id} = req.body;
    if (title.length < 1 || !id) {
        res.error(2)
        return
    }
    if (util.hasScript(title)) {
        res.error(20001)
        return
    }
    Article.update(
        {title, content, state, isPublish, username},
        {where: {id: id}})
        .then((rst) => {
            if(rst.length<1){
                res.error(2)
            }
            res.success('更新成功！', rst)
        })
})


module.exports = router