var mongoose = require("mongoose")
mongoose.Promise = require("bluebird");

///var Schema = mongoose.Schema
var ObjectId = mongoose.Schema.ObjectId

var CommentSchema  = new mongoose.Schema({
    movie: {type: ObjectId, ref: "Movie"},
    from: {type: ObjectId, ref: "User"},
    replay:[{
            from: {type: ObjectId, ref: "User"},
              to: {type: ObjectId, ref: "User"},
         content: String
              
      }
    ],
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


/*MovieSchema.pre("save",function(next){
    if ( this.isNew ){
      this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
      this.meta.updateAt = Date.now()
    }

    next()
})
*/
//静态方法不会和数据库进行交互
CommentSchema.statics = {
 
  findById: function(id,cb){
     return this.findOne({_id: id}).exec(cb)

  },
   fetch: function(cb){

     return this.find({}).exec(cb)

  },

}

module.exports = CommentSchema





