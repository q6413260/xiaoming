/**
 * User: willerce
 * Date: 7/24/12
 * Time: 9:13 PM
 */

var mongoose = require('mongoose');
var mongoskin = require('mongoskin');

var config = {

  //site settings
  name: 'Smartの小明',
  version: '0.0.3',
  postNum: process.env.POST_NUM || '5',//每页显示文章个数
  session_secret: process.env.SESSION_SECRET || 'a743894a0e',//session加密串
  cookie_secret: process.env.COOKIE_SECRET || 'a743894a0e',//session加密串
  auth_cookie_name: process.env.AUTH_COOKIE_NAME || 'nd_secret',//cookie 名字
  spam_cookie_name: process.env.SPAM_COOKIE_NAME || 'nd_spam',//防spam cookie的名字
  port: process.env.PORT || 3000,//端口号
  theme: process.env.THEME || 'one'//主题名称
};

config.akismet_options = {
  apikey: '', // akismet api key，不启用 akismet 请设置为空
  blog: config.url // required: your root level url
};

// Feed Config
config.rss = {
  max_rss_items: "5",
  title: "Smartの小明",
  description: "小明，写给未来的自己。",
  link: process.env.RSS_LINK || "http://willerce.com",
  language: "zh-cn",
  managingEditor: "228160255@qq.com",
  webMaster: "228160255@qq.com",
  generator: "小明",
  author: {
    name: "willerce",
    uri: "http://willerce.com"
  }
};

exports.config = config;

//mongodb settings for mongolab START
//如果使用 MongoLab 提供的 MongoDB 服务，请保留这个配置，否则，删除下面这一行
//exports.db = mongoskin.db(process.env.MONGOLAB_URI || "mongodb://localhost/noderce");//数据库连接串
//mongodb settings for mongolab END

//mongodb settings for appfog mongodb service START
//如果使用 Appfog 自带的 MongoDB服务，请使用以下配置
if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-1.8'][0]['credentials'];
}
else {
  var mongo = {
    "hostname": "localhost",
    "port": 27017,
    "username": "",
    "password": "",
    "name": "",
    "db": "noderce"
  }
}
var generate_mongo_url = function (obj) {
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'test');
  if (obj.username && obj.password) {
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  } else {
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
};
mongoose.connect(generate_mongo_url(mongo));
exports.mongoose = mongoose;
//mongodb settings for appfog mongodb service END