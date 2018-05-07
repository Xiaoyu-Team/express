# 源码阅读

# express 实现（history）
> 本来是想着实现的一个的，没有墨水了
>[源码解读](https://github.com/SunShinewyf/issue-blog/issues/20)
>阅读源码的最好方式是自己实现一个

### 基本说明

express 版本：4.14.0

node 版本： 8.11.1 

我们需要使用pm2来测试文件,进入express 文件夹

```
pm2 start node index.js --watch
```

### 暴露模块

```
module.exports = require('./lib/express');
```

exports 暴露问题

### 创建实例 

```
/**
 * 创建express 实例.
 */
function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };
  ...
  app.init();
  return app;
}
```

最先运行的是init()(applation.js)
在express.js 中我们看到引入的文件顺序

```
var proto = require('./application');
var Route = require('./router/route');
...
```

application 是第一个文件。我们先重点先看applations, 文件

```
/**
 *  默认配置
 *  中间件
 *  router
 */
app.init = function init() {
  this.cache = {};// 缓存
  this.engines = {};// 
  this.settings = {};// 基本设置

  this.defaultConfiguration();// 配置文件初始化
};
```

为了方便测试我们需要listen方法；


### 实现
>我们跟随官网

参考官网我们可以看到，主要分为

0. 应用
1. 路由
2. 中间件
3. 请求
4. 响应

我们主要从这四个方面进行展开操作。

### 测试---官网的例子开始

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```
首先是require加载我们可以看考[文章](http://www.infoq.com/cn/articles/nodejs-module-mechanism)
紧接着是
```
app = express();  
```
一般来说是返回实例。
现在我们需要解决的是,本地服务问题，方便我们调试

```
function Express () {
    var http = require('http');
    var fs = require('fs');
    http.createServer(function(request, response) {
        var body = 'Thanks for calling';
        var content_length = body.lenggth;
        response.writeHead(200, {
            'Content-Type': 'text/plain',
        });
        response.end('Hello World\n');
    }).listen(8888);
}
var express = function() {
    return new Express();
}
var app = express();
```
这样我们就可以，实现在浏览器中观察我们写的内容了，当然代码并丑陋。

### Request 请求
>Application 是一些方法，我们放在最后来实现。

我们首先面对的就是路由器。我们先解决URL问题。

req和res是封装在回调函数的这里有简单的url 处理，

```
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
```
这样写写法肯定是不对的。req 的解析伴是对应一个url的。
 
#### get 

get 中的path有几种基本的形式，比如 `/`, `/user`, `/user/:id`,其中涉及到了正则表达式的解析，我这不太会啊。略过正则表达式的部分。

####  开始阅读源码












