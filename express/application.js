/************* application(http server) **********/
var http = require('http');

var app = exports = module.exports = {};
app.init = function init() {
    this.cache = {};// 缓存
    this.engines = {};// 
    this.settings = {};// 基本设置
  
    //this.defaultConfiguration();// 配置文件初始化
  };
/**
 * 创建本地服务器
 * listener 80
 */
app.listen = function() {
    console.log(123);
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
}
/**
 * 做一些基本设置
 *  
 * setting 属性名字
 * val 
 */

app.set = function set (setting, val) {
   if(arguments.length  === 1) {
        return  this.setting[setting];
   }
   this.setting[setting] = val;
}







