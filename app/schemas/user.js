//创建用户模型

var mongoose = require("mongoose")
mongoose.Promise = require("bluebird");
//var bcrypt = require("bcrypt")
var SALT_WORK_FACTOR = 10

var UserSchema  = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: {
       
        type: String,

    },
    // 0: normal user
    // 1: verified user
    // 2: professonal
    // >10: admin
    // >50: super admin

    role: {
        type:Number,
        default: 0
    },
    meta:{
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt:{
            type: Date,
            default: Date.now
        }
    }
         
     

})

UserSchema.statics= {
    comparPassword: function(_password, cb){
        cb(null, true)

    }
}
/*
UserSchema.post("save",true,function(next,done){
    console.log("this is save")
    next()
    done()
})



UserSchema.pre("save",function(next){
    var user = this
    if ( this.isNew ){

    } else {

    }

    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
            if(err) return next(err)
                bcrypt.hash(user.password,salt,function(err,hash){
                       if(err) return next(err)
                        user.password = hash
                        next()
                })
    })
    next()
})
*/


module.exports = UserSchema





