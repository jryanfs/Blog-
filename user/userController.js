const express = require('express');
const router = express.Router();
const User = require('./modelUser');
const bcrypt = require('bcryptjs');

router.get('/admim/users',(req,res)=>{
   return res.send('Listagem de usuários');
});
router.get('/admim/users/create',(req,res)=>{
    return res.render('admim/users/create');
});
router.post('/admim/users/save',(req,res)=>{
    let email =  req.body.email;
    let password = req.body.password;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);
    
    User.create({
        email:email,
        password:hash
    }).then(()=>{
        return res.redirect('/');
    }).catch(()=>{
        return res.redirect('/');
    })
});
module.exports = router;