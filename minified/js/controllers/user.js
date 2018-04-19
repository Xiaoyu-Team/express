var User = require("../models/user.js")
// singnup
exports.signup = function(req,res){
     var _user = req.body

    User.find({name: _user.name},function(err,users){
        if(err){
            console.log(err)
        }

        if(users.length) {
            return res.redirect('/')
        }else{
                var user = new User(_user)
                user.save(function(err,info){
                    if(err) {
                       console.log(err) 
                    }
                    res.redirect('/')
                })
        }
    })
}


/*app.post("/user/singnup",urlencodedParser,function(req,res){
   
})*/

exports.signin = function(req,res){
    var _user = req.body
    var name = _user.name
    var  password = _user.password
    User.findOne({name: name},function(err,user){
        if(err){
            console.log(err)
        }

        if(!user) {
            return res.redirect('/signup')
        }

       
        User.comparPassword(password,function(err,isMatch){
            if(err) {
               console.log(err) 
            }
            if(isMatch){
                req.session.user = user
               

                return res.redirect('/')
            }else {
                console.log(" password is not matched ")
            }
        })
        
    })
}

/*// singnin
app.post("/user/singnin",urlencodedParser,function(req,res){
    
})*/

exports.logout = function(req,res){
    //logout
    delete req.session.user
    //delete app.locals.user
    res.redirect("/")

}



exports.showSignup = function(req,res){
    res.render("signup",{
        title: "注册页面"
    })
}


exports.showSignin = function(req,res){
    res.render("signup",{
        title: "登录页面"
    })
}

//midware for user
exports.signinRequired = function(req,res,next){
    var  user = req.session.user
    if(!user){
        return res.redirect("/signin")
    }

    next()
}

//midware for user
exports.adminRequired = function(req,res,next){
    var  user = req.session.user
   
    if(user.role <= 10 ){
        return res.redirect("/")
    }

    next()
}
