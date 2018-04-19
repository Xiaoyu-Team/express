var mongoose = require("mongoose")
var CatetorySchema = require("../schemas/catetory")

var db = require("../../config/mongoose")()
  

//创建一个数据库连接

module.exports = db.model("Catetory",CatetorySchema)
