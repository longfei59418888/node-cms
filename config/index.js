
module.exports={

    WEB_PORT:8081,

    COOKIE_SECRET:'node-cms',
    ENCRYPT_KEY:"node-cms",


    //数据库信息
    DB_URL:'mongodb://127.0.0.1:27017/mycms',
    // DB_URL:'mongodb://182.254.232.106:27017/mycms',
    DB_NAME:'node_cms',
    HOST: '',
    PORT: 27017,
    USERNAME: 'root',
    PASSWORD: '12345678',


    //本地缓存设置
    REDIS_HOST: '127.0.0.1',
    // REDIS_HOST: '182.254.232.106',
    REDIS_PORT: 6379,
    REDIS_PSD : '',
    REDIS_DB: 0,
    REDIS_TTL:60000,


    //管理员权限
    ADMIN_POWER_LIST:['system','article','goods','member']

}