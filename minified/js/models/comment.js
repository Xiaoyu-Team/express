var mongoose = require("mongoose")
var CommentSchema = require("../schemas/comment")
var db = require("../../config/mongoose")()

//创建一个数据库连接
var Comment = db.model("comment",CommentSchema) 
module.exports = Comment
