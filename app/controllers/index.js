//var Catetory  = require("../models/catetory.js")

var db = require("../../config/mongoose")()
var MovieSchema = require("../schemas/movie")
var Movie = db.model("Movie",MovieSchema)

var CatetorySchema = require("../schemas/catetory")
var Catetory = db.model("Catetory",CatetorySchema)


exports.index = function(req,res){
    console.log("user in session:")
    console.log(req.session.user)

    Catetory
      .find({})
      .populate({path: "movies",options: {limit: 5}})
      .exec(function(err,doc){
         if(err){
            console.log(err)
         }
            res.render("index",{
                title: "imooc 首页",
                catetories: doc
            })

      })


}

exports.search = function(req,res){
  var catId =  req.query.cat 
  var page =  req.query.p 
  var index = page*2
  var count =2
  Catetory
      .find({_id: catId})
      .populate({path: "movies"})
      .exec(function(err,cat){
         if(err){
            console.log(err)
         }
         var cat = cat[0] || []
         var movie = cat.movies.slice(index, index+ count)
         var totalpage = Math.ceil(cat.movies.length/count)


            res.render("result",{
                title: "imooc 首页",
                cat: movie,
                keyword: cat.name,
                currentPage: page +1,
                totalPage: totalpage,
                catId: catId



            })

      })

}

