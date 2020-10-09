const express = require('express');
const Router =  express.Router();
const modelCategory = require('../categories/ModelCategory');
const modelArtigo =  require('./ModelArticle');
const slugify = require('slugify');


Router.get(('/admim/articles'),(req,res)=>{
    modelArtigo.findAll({
        include:[{
            model: modelCategory
        }]
    }).then(articles=>{
        return res.render('admim/articles/articles',{articles:articles});
    });
})

Router.get(('/admim/articles/new'),(req,res)=>{
    
    modelCategory.findAll().then(categories =>{

        return res.render('admim/articles/new',{categories:categories});
    }).catch(()=>{
        return res.redirect('admim/articles');
    });

});

Router.post('/admim/articles/delete',(req,res)=>{
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            modelArtigo.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                return res.redirect('/admim/articles');
            });
            
        }else{
            return res.redirect('/admim/articles');
        }
    }else{
        return res.redirect('/admim/articles');

    }
});


Router.post('/admim/articles/save',(req,res)=>{
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;
    
    
    modelArtigo.create(
        {
            title: title,
            slug : slugify(title),
            body: body,
            categoryId : category
        }
    ).then(()=>{
        return res.redirect('/admim/articles'); 
    
    });

})




Router.get('/admim/articles/edit/:id',(req,res)=>{
    let id = req.params.id;

    modelArtigo.findByPk(id).then(article =>{
        if(article != undefined){
            modelCategory.findAll().then(categories =>{
                return res.render('admim/articles/edit',{article:article,categories:categories});
            })
        }else{
            return res.redirect('/admim/articles');
        }
    }).catch(err=>{
       return res.redirect('/admim/articles');
    })

});


Router.post('/admim/articles/update',(req,res)=>{
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;


    modelArtigo.update({
        title:title,
        body:body,
        categoryId:category,
        slug:slugify(title)
    },{where:{
        id:id
    }
    }).then(()=>{
        return res.redirect('/admim/articles');
    }).catch(()=>{
        return res.redirect('/');
    })

})


module.exports = Router;