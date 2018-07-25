var express = require('express');
var router = express.Router();
var xss = require('xss')
router.caseSensitive = true;  //大小写敏感
var util = require('../../../utils')
var Classify = require('./classify')

router.get('/list', (req, res) => {
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
router.get('/year', (req, res) => {
    Classify.getTimeList().then(rst => {
        if (rst.length < 1) {
            res.error(2)
        }
        res.success('', rst)
    })
    return
})

module.exports = router