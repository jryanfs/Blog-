const express = require('express');
const router = express.Router();
const User = require('./modelUser');
const bcrypt = require('bcryptjs');
const admimAuth = require('../middlewares/admimAuth');


router.get('/admim/users',admimAuth,(req,res)=>{
   User.findAll().then(users=>{
       
       return res.render('admim/users/user',{users:users});
   }).catch(()=>{
        return res.redirect('/');
   });
});
router.get('/admim/users/create',admimAuth,(req,res)=>{
    return res.render('admim/users/create');
});
router.post('/admim/users/save',(req,res)=>{
    let email =  req.body.email;
    let password = req.body.password;

    User.findOne({where: {email:email}}).then(user=>{
       
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password,salt);
    
            User.create({
            email:email,
            password:hash
            }).then(()=>{
                return res.redirect('/admim/users');
            }).catch(()=>{
                return res.redirect('/');
            })
        } else {
            return res.redirect('/admim/users/create');
        }
    });
});
router.get('/admim/users/edit/:id',admimAuth,(req,res)=>{
    let id = req.params.id;

    if(isNaN(id)){
        return res.redirect('/admim/users');
    }

    User.findByPk(id).then(user=>{
        if(user != undefined){
            return res.render('admim/users/edit',{user:user});
        }else{
            return res.redirect('/admim/users');        }
    }).catch(()=>{
        return res.redirect('/admim/users');
    });

});


router.post('/admim/users/delete',admimAuth,(req,res)=>{
    let id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({where:{id:id}}).then(()=>{
                return res.redirect('/admim/users');
            }).catch(()=>{
                return res.redirect('/admim/users');
            })
        }else{
            return res.redirect('/admim/users');
        }
    }else{
        return res.redirect('/admim/users');
    }
});

router.get('/admim/users/login',(req,res)=>{
    return res.render('admim/login/admim');
});

router.post('/admim/users/autenticate',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email:email}}).then(user =>{
        if(user != undefined){
            let correct = bcrypt.compareSync(password,user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                return res.render('admim/login/painel');
            }else{
                return res.redirect('/admimd/users/login')
            }
        }else{
            return res.redirect('/admim/users/login');
        }
    });
});

router.get('/admim/painel',admimAuth,(req,res)=>{
    return res.render('admim/login/painel');

});

router.get('/admim/logout',(req,res)=>{
    req.session.user = undefined;
    return res.redirect('/'); 
});

module.exports = router;