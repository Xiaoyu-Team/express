# express 实现
>[源码解读](https://github.com/SunShinewyf/issue-blog/issues/20)
>阅读源码的最好方式是自己实现一个


### 基本说明

express 版本：4.14.0
node 版本： 8.11.1 

使用gulp合并文件，命令行执行gulp 就可以了,输出到express/main.js 中；但是我们编写的是node服务，我们需要使用pm2来管理. 

我们首先需要解决服务，来观察我们写的内容

```
pm2 start node ./build/main.js --watch
```

* 分为两个版本:

1. dev 自己实现，不参考官方文件
2. master 仿写express 源码 

## 实现
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

### Application

