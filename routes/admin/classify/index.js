var express = require('express');
var router = express.Router();
var xss = require('xss')
router.caseSensitive = true;  //大小写敏感
var util = require('../../../utils')
var Classify = require('./classify')

router.post('/classify', (req, res) => {
    let {title, description} = req.body
    if (title.length < 1) {
        res.error(0, '参数错误！')
        return
    }
    if (util.hasScript(title)) {
        res.error(20001)
        return
    }
    Classify.findOrCreate({
        where: {title: title},
        defaults: {
            title: title,
            description: description
        }
    }).then((rst) => {
        if (rst[1]) {
            res.success('创建成功！', rst[0].dataValues)
            return
        }
        res.error(2, '存在当前分类！')
    })
})

router.delete('/classify', (req, res) => {
    let {id} = req.body
    if (!id) {
        res.error(2)
        return;
    }
    Classify.destroy({
        where: {id: id}
    }).then(rst => {
        console.log(rst)
        res.success('', rst)
    })
})

router.get('/classify', (req, res) => {
    let {page, size, id} = req.query
    size = size ? size : 100
    page = page ? page : 0
    if (id) {
        Classify.findById(id).then(rst => {
            if (rst.length < 1) {
                res.error(2)
            }
            res.success('', rst)
        })
        return
    }

    Classify.findAndCountAll({
        limit: size,
        offset: size * page
    }).then(rst => {
        res.success('', rst)
    })
})

router.put('/classify', (req, res) => {
    let {title, description, id} = req.body
    if (title.length < 1 || !id) {
        res.error(0, '参数错误！')
        return
    }
    if (util.hasScript(title)) {
        res.error(20001)
        return
    }

    Classify.update({
        title,
        description
    }, {where: {id}}).then(rst => {
        if (rst.length < 1) {
            res.error(2)
        }
        res.success('更新成功！', rst)
    })
})


module.exports = router