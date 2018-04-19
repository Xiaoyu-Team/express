
# 学习express&node

## 源码实现

学习了express 源码，看文件EXPRESS.md

## mongoDB

[MAC 安装与启动](http://www.runoob.com/mongodb/mongodb-osx-install.html)

** 如果创建全局路径 PATH**

sudo mongod

** 如果没有创建全局路径 PATH，需要进入以下目录** 

cd /usr/local/mongodb/bin

sudo ./mongod






2016年10月11日
    1实现登录
    2退出 
    3express-session （learning）
       将session 存在了 mongodb中，使用了connect-mongo插件
       
   
   note:
   session 会话控制
           概念：具体是指用户进入 网站到退出 网站这段时间 的概念
           作用：存储整个用户使用过程中的 保持的 状态信息


                
2016年10月13日
	nodemon 监视数据的变化
	pm2 
	node-inspector 调试工具         
	controller/moveis
      

2016年10月14日10:53:53
    Q: 在进行关联的数据查询的时候，没有查到数据
       位置：在controller/movie

       问题代码：  Movie.findById(id, function(err, movie){
            Comment
             .find({movie:id})
             .populate("from")
             .exec(function(err,doc){
                res.render("detail",{
                    title: "imooc 详情页" + movie.title,
                    movie: movie,
                    comments: doc
                })

             })


        })

        辅助信息：CommetSchema定义为
              var CommentSchema  = new mongoose.Schema({
              movie: {type: ObjectId, ref: "Movie"},
              from: {type: ObjectId, ref: "User"},
              content: String,
              meta: {
                createAt:{
                  type:Date,
                  default: Date.now()
                },
                updateAt: {
                   type:Date,
                  default: Date.now()
                }
              }

          })


        populate("from","name")没有查到数据 
        error:MissingSchemaError: Schema hasn't been registered for model "User".

    A: 可能是加载的顺序造成的，还没有更好的解决办法
        引入
          var db = require("../../config/mongoose")()
          var UserSchema = require("../schemas/user")
          var User = db.model("User",UserSchema)
          var CommentSchema = require("../schemas/comment")
          var Comment = db.model("Comment",CommentSchema) 
欧冠

