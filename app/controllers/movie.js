var _= require("underscore")
var Movie = require("../models/movie.js")
var path = require("path")
var fs = require("fs")


/**
*在多标查询的时候引入相关变量
*/
var db = require("../../config/mongoose")()
var UserSchema = require("../schemas/user")
var User = db.model("User",UserSchema)
var CommentSchema = require("../schemas/comment")
var Comment = db.model("Comment",CommentSchema) 
var Catetory = require("../models/catetory")


  

exports.new = function(req,res){
    Catetory
      .find({})
      .exec(function(err,catetory){
         if(err){
            console.log(err)
         }

          res.render("admin",{
            title: "imooc 后台人员",
            movie:{
                title:'',
                doctor: '',  
                country: "",
                language: "",
                poster:"",
                catetory: "",
                flash: "http://static.youku.com/v1.0.0657/v/swf/loader.swf",
                year:2014,
                summary: "不错"              
        
            },
            catetory: catetory
    })

      })

}


exports.update =  function(req,res){
     var id = req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
             res.render("admin",{
                title: "imooc 首页",
                movies: movie
        })

        })
    }
}



exports.save = function(req,res){
     //var id = req.body.movie._id
   var id = false
   var movieObj = req.body
   var _movie
    // 输出 JSON 格式

    if ( id ){
            Movie.findById(id, function(err, movie){
            if(err){
                console.log(err)
            }

            _movie = _.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)

            })
        })


         
    }else {
        _movie = new Movie({

            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            catetory: movieObj.catetory,
            summary: movieObj.summary,
            flash: movieObj.flash,
            meta:{
                createAt: 2014-2-1,
                updateAt:2014-5-6
            }

        })

         _movie.save(function(err,movie){
           
                if(err){
                    console.log(err)
                }
        Catetory.findById(movieObj.catetory,function(err,catetory){
            catetory.movies.push(movie._id)

            catetory.save(function(err,doc){
                if(err){
                    console.log(err)
                }
            })
        })





                res.redirect('/movie/' + movie._id)
        })
      }
}


exports.list = function(req,res){
 
        Movie.fetch(function(err, movies){
            if(err){
                console.log(err)
            }

            res.render("list",{
                title: "imooc 首页",
                movies: movies
            })

        })
     
    }

// detail page
exports.detail = function(req,res){

var id=req.params.id
    Movie.findById(id, function(err, movie){
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
}



//delete
exports.del = function(req,res){
    var id = req.query.id
    if(id){
        Movie.remove({_id: id},function(err,movie){
            if(err){
                console.log(err)
            }else {
                res.json({success: 1})
                console.log("success del")
            }
        })
    }else{
        res.json({success: 1})
    }
}


//Poster
exports.Poster = function(req,res,next){
    console.log("req.files")
    console.log( req.files);
     //var id = req.body.movie._id
 
   next()
    // 输出 JSON 格式
}