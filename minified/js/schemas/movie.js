
var mongoose = require("mongoose")
mongoose.Promise = require("bluebird");
var ObjectId = mongoose.Schema.ObjectId

var MovieSchema  = new mongoose.Schema({
    name:String,
    doctor:String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    catetory:{
      type:  ObjectId,
      ref: "Catetory" 
    },
    year: Number,
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
MovieSchema.statics = {
 
  findById: function(id,cb){
     return this.findOne({_id: id}).exec(cb)

  },
   fetch: function(cb){

     return this.find({}).exec(cb)

  },

}

module.exports = MovieSchema





