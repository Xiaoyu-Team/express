'use strict';
var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
/************ Utils 工具 **************************/
var http = require('http');
var fs = require('fs');
var url = require('url');
var util = require('util');
/**
 * Logs a Message
 * @param {String} msg
 */
var log = function log(msg) {
    if (Express.config.silent === false) {
        console.log(msg);
    }
};
/**
 * Throws an Error
 * @param {String} msg
 */
var error = function error(msg) {
    if (Express.config.silent === false) {
        console.error('[Express] ERROR: ' + msg);
    }
};
//是否是字符串 
var _isString = function _isString(value) {
    return typeof value === 'string';
};
// 是否数字 
var _isNumber = function _isNumber(value) {
    return typeof value === 'number';
};
// 是否数字 
var _isUndefined = function _isUndefined(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === void 0;
};
//是否布尔型 
var _isBoolean = function _isBoolean(value) {
    return typeof value === 'boolean';
};
//是否null 
var _isArray = function _isArray(value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
};
// 是否是对象
var _isObject = function _isObject(value) {
    Object.prototype.toString.apply(value) === '[object Object]';
};
var defineProperty = function defineProperty(obj, em) {
    var keys = Object.keys(obj);
    keys.forEach(function (name) {
        em[name] = obj[name];
    });
};
/**
 * 函数主体文件 
 */
function Express(options) {
    var self = this;
    var params = {};
    // url 参数
    this.protocol = '';
    this.slashes = '';
    this.auth = '';
    this.host = '';
    this.port = '';
    this.hostname = '';
    this.hash = '';
    this.search = '';
    this.query = {};
    this.pathname = '';
    this.path = '';
    this.href = '';
    this.options = options;    // 初始化选项
}
/**
 * 处理request
 * @param {k} request 
 */
Express.prototype.request = function (req, res) {
    var self = this;
    // 解析 url 参数
    //url.parse为true时，会使用querystring模块来解析URL中德查询字符串部分，默认为 false。
    //输出结果如下
    // { protocol: 'http:',
    // slashes: true,
    // auth: 'user:pass',
    // host: 'host.com:8080',
    // port: '8080',
    // hostname: 'host.com',
    // hash: '#hash',
    // search: '?query=string',
    // query: {query:"string"},
    // pathname: '/p/a/t/h',
    // path: '/p/a/t/h?query=string',
    // href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' 
    self.params = url.parse(req.url, true);
    defineProperty(self.params, self);
};
/************* application(http server) **********/
var http = require('http');
/**
 * 创建本地服务器
 */
app.listen = function () {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
};
/**
 * 做一些基本设置
 *  
 * setting 属性名字
 * val 
 */
app.set = function set(setting, val) {
    if (arguments.length === 1) {
        return this.setting[setting];
    }
    this.setting[setting] = val;
};
/**
 * 创建express 实例.
 */
var mixin = require('merge-descriptors');
// 属性复制
var proto = require('./application');
function createApplication() {
    var app = function app(req, res, next) {
        app.handle(req, res, next);
    };
    //...
    app.init();
    return app;
}
module.exports = createApplication;