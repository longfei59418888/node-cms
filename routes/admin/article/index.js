var express = require('express');
var router = express.Router();
var util = require('../../../utils')
var Article = require('./articles')

router.caseSensitive = true;  //大小写敏感

router.post('/article/:id', (req, res) => {
    let {title, content, state, isPublish, username} = req.body;
    let id = req.params.id;
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
        defaults: {
            title, content, state, isPublish, username,
            classifyId: id
        }
    })
        .then((rst) => {
            if (rst[1]) {
                res.success('创建成功！', rst[0].dataValues)
                return
            }
            res.error(2, '文章名称已存在！')
        })
})


router.delete('/article/:id', (req, res) => {
    let {id} = req.params
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
    let {id} = req.query
    let classifyId = req.params.id
    if (id) {
        Article.findById(id).then(rst => {
            if (rst.length < 1) {
                res.error(2)
            }
            res.success('', rst)
        })
        return
    }

    Article.findAll({
        attributes: ['title', 'id'],
        order: [['createdAt', 'DESC']],
        where: {
            classifyId,
        }
    }).then(rst => {
        res.success('', {rows: rst})
    })
})

router.put('/article/:id', (req, res) => {
    let {title, content, state, isPublish, username} = req.body;
    let id = req.params.id;
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
            if (rst.length < 1) {
                res.error(2)
            }
            res.success('更新成功！', rst)
        })
})


module.exports = router