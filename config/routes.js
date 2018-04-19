
var express = require('express')
var app = express()
var _= require("underscore")
var Movie = require("../app/models/movie.js")
var User = require("../app/models/user.js")
var userCon = require("../app/controllers/user.js")
var bodyParser = require('body-parser');





var session = require('express-session')
var mongoStore = require("connect-mongo")(session)
var dburl ='mongodb://localhost/imooc' 


var Index = require("../app/controllers/index")
var Movie = require("../app/controllers/movie")
var userfn = require("../app/controllers/user")
var Comment = require("../app/controllers/Comment")
var Catetory = require("../app/controllers/catetory")

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(multipart({uploadDir:'./temp' }));//设置上传文件存放的地址。

module.exports = function(app){

// 创建 application/x-www-form-urlencoded 编码解析
//pre handle test
app.use(function(req,res,next){
    var _user = req.session.user
    if(_user){
        app.locals.user = _user

//req.session.cookie.expires = new Date(Date.now() + 30 * 1000)
    }else{
        
        delete app.locals.user
        
    }
        return next()
    
})
/**
*index
*/
//index
app.get("/",Index.index)


app.get('/chart', (req, res) => {
    res.render("./chart", {
        title: "LsgoChat",
        val: "连接中"
    });
});

/**
*user
*/
//singnup
app.post("/user/singnup",userfn.signup)

// singnin
app.post("/user/singnin", userfn.signin)

//form singup
app.get("/signup",userfn.showSignup)

// form singnin
app.get("/signin", userfn.showSignin)



/**
*comment
*/

app.post("/user/comment", userCon.signinRequired, Comment.save)





/**
*movie
*/
//new
app.get("/admin/movie",userCon.signinRequired,
userCon.adminRequired, Movie.new)

//update
app.get("/admin/update/:id",userCon.signinRequired,
userCon.adminRequired,Movie.update)

//save
app.post("/admin/movie/new",multipartMiddleware,userCon.signinRequired,
userCon.adminRequired,Movie.save)

//list
app.get("/admin/list",userCon.signinRequired,
userCon.adminRequired,Movie.list)

//detali
app.get("/movie/:id",Movie.detail)

//delete
app.delete("/delete",userCon.signinRequired,
userCon.adminRequired,Movie.del)

//logout
app.get("/logout",userfn.logout)



/**
*category
*/
app.get("/admin/catetory", userCon.signinRequired, userCon.adminRequired,Catetory.new)

app.post("/admin/category/save",userCon.signinRequired, userCon.adminRequired,Catetory.save)


/**
*page
*/
app.get("/search",Index.search)

}









