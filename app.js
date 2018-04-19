var express  = require("express")
var path  = require("path")

//var consolidate = require('consolidate');

var isDev = process.env.NODE_ENV !== 'production';
var app = express()
var port = process.env.PORT || 3000
var users = {}
var MAX_LEAVE_TIME = 300;
var PONG_TIME = 3000;

var cookieParser = require("cookie-parser")
var session = require('express-session')
var mongoStore = require("connect-mongo")(session)
var dburl ='mongodb://localhost/imooc' 

app.set("views","./app/views/pages")
app.set("view engine" ,"jade")


// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;


app.use(cookieParser())
app.use(session({
    secret: "imooc",
    store: new mongoStore({
        url: dburl,
        collection: "sessions"
    }),
    cookie: {maxAge: 60*60*1000}//i
}))
 

//如果是开发环境下的
/*if("development" === app.get("env")){
    app.set("showStackError",true)
    app.use(express.logger(":method :url :status"))
    app.locals.pretty = true
    mongoose.set("debug",true)
}*/



if( isDev ){
    console.log(212121)
    // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.js');

    var compiler = webpack(webpackDevConfig);

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {

        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.join(__dirname,"public")))
    require('./config/routes')(app);
    // add "reload" to express, see: https://www.npmjs.com/package/reload
    var reload = require('reload');
    var http = require('http');

    var server = http.createServer(app);
    reload(server, app);


    //socket.io
    var  io = require("socket.io").listen(server)
    io.on("connection",function(socket){
            // 用户登录
    socket.on("login", (nickname) => {
        if (users[nickname] || nickname === "system") {
            socket.emit("repeat");          
        } else {
            socket.nickname = nickname;
            users[nickname] = {
                name: nickname,
                socket: socket,
                lastSpeakTime: nowSecond()
            };
            socket.emit("loginSuccess");            
            UsersChange(nickname, true);
        }
    });

    // 用户退出
    socket.on("disconnect", () => {
        if (socket.nickname && users[socket.nickname]) {
            delete users[socket.nickname];
            UsersChange(socket.nickname, false);
        }
    });

    // 用户发消息
    socket.on("postmsg", (msg) => {
        // 通知除自己外的其他用户
        users[socket.nickname].lastSpeakTime = nowSecond();
        socket.broadcast.emit("newmsg", socket.nickname, msg);
    });

    // 私聊
    socket.on("pc", (data) => {
        var target = data.target;
        users[socket.nickname].lastSpeakTime = nowSecond();
        if (users[target]) {
            users[target].socket.emit("pcmsg", {
                target: target,
                source: socket.nickname,
                msg: data.msg
            });
        } else {
            var msg = target === "system" ? "傲娇的system管理员不陪聊~" : "该用户已经下线";
            socket.emit("nouser", msg);
        }
    });
    // 心跳检测
    socket.on("pong", (id) => {
        socket.emit("ping");
    });
});

        function pong () {
            const now = nowSecond();
            for (var k in users) {
                if (users[k].lastSpeakTime + MAX_LEAVE_TIME < now) {
                    var socket = users[k].socket;
                    users[k].socket.emit("disconnect");
                    socket.emit("nouser", "由于长时间未说话，您已经掉线，请重新刷新页面");
                    socket = null;
                } 
            }
        }


        // 心跳检测
        setInterval(pong, PONG_TIME);
        function UsersChange (nickname, flag) {
            io.sockets.emit("system", {
                nickname: nickname,
                size: Object.keys(users).length,
                flag: flag
            });
        }

        function nowSecond () {
            return Math.floor(new Date() / 1000);
        }






    server.listen(port, function(){
        console.log('App (dev) is now running on port 3000!');
    });

}else{

app.use(express.static(path.join(__dirname,"public")))


// static assets served by express.static() for production
    require('./config/routes')(app);
    app.listen(port, function () {
        console.log('App (production) is now running on port 3000!');
    });
}
