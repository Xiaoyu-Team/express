var mongoose = require("mongoose")
var UserSchema = require("../schemas/user")

var db = require("../../config/mongoose")()
  

//创建一个数据库连接

module.exports = db.model("User",UserSchema)
