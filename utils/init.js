
var errorMsg = require('./error.config')
module.exports = function (req,res,next) {
    var origin = req.headers.origin ? req.headers.origin :true;
    res.setHeader('Access-Control-Allow-Origin', origin);//注意这里不能使用 *
    res.setHeader('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.error = function (errorCode,msg) {
        var msg = msg?msg:errorMsg[errorCode]
        res.end(JSON.stringify({
            msg:msg,
            status:errorCode,
        }))
    }
    res.success = function (msg,data) {
        res.end(JSON.stringify({
            msg:msg,
            status:1,
            data:data,
        }))
    }
    next()
}