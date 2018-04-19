var Comment = require("../models/comment.js")
var Movie = require("../models/movie")
var User = require("../models/user")





exports.save = function(req,res){
   var _comment = req.body
   //判断是否有commentId 如果有就是replay

  
    if(_comment.commentId){
       console.log("_comment")
      console.log(_comment)
      Comment.findById(_comment.commentcId,function(err,doc){
             console.log("doc:" )
           console.log(doc)
           var replay = {
             from: _comment.from,
             to : _comment.commentId,
             content: _comment.content
           }
           doc.replay.push(replay)
           doc.save(function(err,commentdata){
           console.log(commentdata)
                if(err){
                    console.log(err)
                }

                res.redirect('/movie/' + commentdata.movie)
        })
      })



    }else{

           var comment  = new Comment({
                         movie: _comment.movie,
                         from: _comment.from,
                         content: _comment.content,
                    })


         comment.save(function(err,commentdata){
           console.log(commentdata)
                if(err){
                    console.log(err)
                }

                res.redirect('/movie/' + commentdata.movie)
        })

    }
           
   
      
}
