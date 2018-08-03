var express = require('express');
var session = require('express-session');   //中间件
var RedisStore = require('connect-redis')(session);  //创建redis对象
var path = require('path');
var logger = require('morgan');             //中间件   输出日志
var cookieParser = require('cookie-parser');  //cookie中间件
var bodyParser = require('body-parser');        //post参数解析
var compression = require('compression');   //压缩静态内容  gzip
var FileStreamRotator = require('file-stream-rotator');  //日志分割
var fs = require('fs')
var config = require('./config')
var babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));
require('babel-register')

var app = express();


// app.post('/upload',function (req,res){
//     // var origin = req.headers.origin ? req.headers.origin :true;
//     // res.setHeader('Access-Control-Allow-Origin', origin);//注意这里不能使用 *
//     // res.setHeader('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
//     // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//     // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     // res.setHeader('Content-Type', 'application/json;charset=utf-8');
//
//
//     return
//
// });

app.use(compression());

//请求日志监控
var logDirectory = path.join(__dirname, 'log')  //日志目录
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
app.use(logger('combined', {stream: accessLogStream}))

// 解析上传文件





// 解析 application/json
app.use(bodyParser.json({limit: '50mb'}));
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false , limit: '50mb' }));

app.use(cookieParser(config.COOKIE_SECRET));
app.use(session({
    secret: config.COOKIE_SECRET,
    cookie: {maxAge: 3600000 },
    saveUninitialized: true,
    resave: true,
}))

/*
* 重写 res 事件
* */
app.use(require('express-promise')());


//在请求时候，给请求添加session  并添加到redis中
// app.use(session({
//     secret: config.COOKIE_SECRET,
//     store: new RedisStore({                 //常见Redis对象 作为存储
//         port: config.REDIS_PORT,
//         host: config.REDIS_HOST,
//         pass : config.REDIS_PSD,
//         ttl: config.REDIS_TTL // 过期时间
//     }),
//     resave: true,
//     saveUninitialized: true
// }));

app.use(require('./utils/init'))

app.use('/admin',require('./routes/admin'));
app.use('/api',require('./routes/client'));
// app.use('/common',require('./routes/common'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
});

module.exports = app
























