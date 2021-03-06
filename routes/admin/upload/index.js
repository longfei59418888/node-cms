var express = require('express');
var router = express.Router();
var config = require('../../../config')
router.caseSensitive = true;  //大小写敏感
var COS = require('cos-nodejs-sdk-v5');
const cos = new COS({SecretId: config.SecretId, SecretKey: config.SecretKey});
// 分片上传
var formidable = require('formidable')

router.post('/upload', (req, res) => {

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields, files) {
        console.log(err, fields, files)
        cos.sliceUploadFile({
            Bucket: "xiao-1251424696",
            Region: "ap-guangzhou",
            Key: files.file.name,
            FilePath:files.file.path
        }, function (err, data) {
            if(err) {
                res.error(20000,err)
            } else {
                res.success('上传成功', {imgUrl: 'https://'+data.Location})
            }
        });
    })
    return


})



module.exports = router
