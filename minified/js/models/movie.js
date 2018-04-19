var mongoose = require("mongoose")
var MovieSchema = require("../schemas/movie")
var db = require("../../config/mongoose")()

//创建一个数据库连接
var Movie = db.model("Movie",MovieSchema) 
module.exports = Movie
