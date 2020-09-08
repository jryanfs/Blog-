const express = require('express');
const  Router = express.Router(); 
const slugify = require('slugify');
const ModelCategory =  require('./ModelCategory');




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

Router.post('/categories/delete',(req,res)=>{
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            ModelCategory.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                return res.redirect("/admim/categories");
            });

        }else{
            return res.redirect("/admim/categories");
        }
    }else{
        return res.redirect("/admim/categories");
    }
});


Router.get('/admim/categories/edit/:id',(req,res)=>{
    let id = req.params.id;
    
    if(isNaN(id)){
        return res.redirect('/admim/categories')
    }
    ModelCategory.findByPk(id).then((category)=>{
        if(category != undefined){
            return res.render('admim/categories/edit',{category: category});
        }else{
            return res.redirect('/admim/categories');
        }
    }).catch((err)=>{
        return res.redirect('/admim/categories');
    });
});



Router.post('/admim/categories/update',(req,res)=>{
        const id = req.body.id;
        const title = req.body.title;

        ModelCategory.update({title:title,
                              slug: slugify(title)},{  
             where: {
                id:id
            }
    }).then(()=>{
            return res.redirect('/admim/categories');
        }).catch((err)=>{

        });

});



module.exports = Router;

