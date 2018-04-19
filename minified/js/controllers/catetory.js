var MovieSchema = require("../schemas/movie")
var Movie = require("../models/movie.js")
var Catetory  = require("../models/catetory.js")


exports.new = function(req,res){
            res.render("category_admin",{
               title: "后台分类录入页"
            })
}

exports.save  = function(req, res){

   var _catetory = req.body
   console.log(_catetory)
   var catetory = new Catetory({
      name: _catetory.name

   })

   catetory.save(function(err,doc){
      if(err){
        console.log(err)
      }
      //res.redirect('/admin/catetory')

   })
   

}