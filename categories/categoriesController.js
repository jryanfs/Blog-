const express = require('express');
const slugify = require('slugify');
const  Router = express.Router(); 
const ModelCategory =  require('./ModelCategory');
const category = require('./ModelCategory');


Router.get('/admim/categories/new',(req,res)=>{
    return res.render('admim/categories/new');
});


Router.post('/categories/save',(req,res)=>{
    let title = req.body.title;

    if(title != undefined){
        ModelCategory.create({
            title:title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/admim/categories');
        });

    }else{
        return res.redirect('/admim/categories/new');
    }
});

Router.get('/admim/categories',(req,res)=>{

    ModelCategory.findAll().then(categories=>{

        return res.render('admim/categories/category',{categories:categories});
    })

});

module.exports = Router;

