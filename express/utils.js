/************ Utils 工具 **************************/
var http = require('http');
var fs = require('fs');
/**
 * Logs a Message
 * @param {String} msg
 */
var log = function(msg) {
    if (Express.config.silent === false) {
        console.log(msg);
    }
}

/**
 * Throws an Error
 * @param {String} msg
 */
var error = function(msg) {
    if (Express.config.silent === false) {
        console.error("[Express] ERROR: " + msg);
    }
}

//是否是字符串 
var _isString = function(value) {
    return typeof value === 'string';
}

// 是否数字 
var _isNumber = function(value) {
    return typeof value === 'number';
}

// 是否数字 
var _isUndefined = function(value) {
    return typeof value === void 0;
}

//是否布尔型 
var _isBoolean = function(value) {
    return typeof value  === 'boolean';
}
//是否null 
var _isArray = function(value) {
    return  Object.prototype.toString.apply(value) === "[object Array]";
}
// 是否是对象
var _isObject = function(value) {
    Object.prototype.toString.apply(value) === "[object Object]";

}



