/************* application(http server) **********/

/**
 * app.listen(port, [hostname], [backlog], [callback])
 * 创建本地服务器
 * @param {*} port    端口 
 * @param {*} hostname  
 * @param {*} backlog 
 * @param {*} callback 
 */
Express.prototype.listen = function(port, hostname, backlog, callback) {
    if (port === void(0)) {
        return 0;
    }
    http.createServer(function (request, response) {
        var body = 'Thanks for calling';
        var content_length = body.lenggth;
        response.writeHead(200, {
            'Content-Type': 'text/plain',
        });
        response.end('Hello World\n');
   
    }).listen(port);
}
/**
 * 设置一些常量
 * @param {*} name 
 * @param {*} value 
 */
Express.prototype.set = function(name, value) {
    if(name ===  '' || _isUndefined(name)) {
        error('name 错误');
    }
    self.options[name] = name;// 初始化选项
}

/**
 * 获取特定常量
 * @param {*} name 
 */
Express.prototype.set = function(name) {
    if(name ===  '' || _isUndefined(name)) {
        error('name 错误');
    }
    if(!self.options[name] === void(0)) {
        return  self.options[name]
    } else {
        error('没有value')
    }
}







