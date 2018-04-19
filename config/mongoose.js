var mongoose = require("mongoose")
var config = require("./config.js")

  var num = 0
module.exports = function(){
var db = mongoose.createConnection('localhost','imooc'); 
    db.on('error',console.error.bind(console,'连接错误:'));
    db.once('open',function(){
        num +=1
      //一次打开记录
      console.log("打开数据库" + num + "次")
    });

    return db
}