function admimAuth(req,res,next){
    if(req.session.user != undefined){
        return next();
    }else{
        return res.redirect('/admim/users/login');
    }
}


module.exports = admimAuth;