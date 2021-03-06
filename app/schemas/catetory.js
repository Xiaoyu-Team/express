var mongoose = require("mongoose")
mongoose.Promise = require("bluebird");

var ObjectId = mongoose.Schema.ObjectId

var CatetorytSchema  = new mongoose.Schema({
    name: String,
    movies:[{type: ObjectId,ref: "Movie"}],
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



module.exports = CatetorytSchema





