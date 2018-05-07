/**
 * 处理request
 * @param {k} request 
 */
Express.prototype.request = function(req,res) {
    let self = this;
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
        
}