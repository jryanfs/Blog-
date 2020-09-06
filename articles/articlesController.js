const express = require('express');
const Router =  express.Router();
const modelCategory = require('../categories/ModelCategory');


Router.get(('/articles'),(req,res)=>{
    return res.send('Articles');
})

Router.get(('/admim/articles/new'),(req,res)=>{
    
    modelCategory.findAll().then(categories =>{

        return res.render('admim/articles/new',{categories:categories});
    }).catch((err)=>{
        return res.redirect('admim/articles');
    });

})






module.exports = Router;


