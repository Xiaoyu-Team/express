'use strict';
var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
/************ Utils 工具 **************************/
var http = require('http');
var fs = require('fs');
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
/**
 * 函数主体文件 
 */
function Express(options) {
    var self = this;
    self.options = options;    // 初始化选项
}
/************* application(http server) **********/
/**
 * app.listen(port, [hostname], [backlog], [callback])
 * 创建本地服务器
 * @param {*} port    端口 
 * @param {*} hostname  
 * @param {*} backlog 
 * @param {*} callback 
 */
Express.prototype.listen = function (port, hostname, backlog, callback) {
    if (port === void 0) {
        return 0;
    }
    http.createServer(function (request, response) {
        var body = 'Thanks for calling';
        var content_length = body.lenggth;
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello World\n');
    }).listen(port);
};
/**
 * 设置一些常量
 * @param {*} name 
 * @param {*} value 
 */
Express.prototype.set = function (name, value) {
    if (name === '' || _isUndefined(name)) {
        error('name \u9519\u8BEF');
    }
    self.options[name] = name;    // 初始化选项
};
/**
 * 获取特定常量
 * @param {*} name 
 */
Express.prototype.set = function (name) {
    if (name === '' || _isUndefined(name)) {
        error('name \u9519\u8BEF');
    }
    if (!self.options[name] === void 0) {
        return self.options[name];
    } else {
        error('\u6CA1\u6709value');
    }
};
/************ Utils 工具 **************************/
/************* Main(函数主体) *********************/
/************* application(http server) **********/
var express = function express() {
    return new Express({});
};
var app = express();
app.listen(3000);