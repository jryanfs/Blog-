const express = require('express');
const router =  express.Router();
const modelCategory = require('../categories/ModelCategory');
const modelArtigo =  require('./ModelArticle');
const slugify = require('slugify');
const admimAuth = require('../middlewares/admimAuth');

router.get(('/admim/articles'),admimAuth,(req,res)=>{
    modelArtigo.findAll({
        include:[{
            model: modelCategory
        }]
    }).then(articles=>{
        return res.render('admim/articles/articles',{articles:articles});
    });
})

router.get(('/admim/articles/new'),admimAuth,(req,res)=>{
    
    modelCategory.findAll().then(categories =>{

        return res.render('admim/articles/new',{categories:categories});
    }).catch(()=>{
        return res.redirect('/admim/articles');
    });

});

router.post('/admim/articles/delete',admimAuth,(req,res)=>{
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


router.post('/admim/articles/save',admimAuth,(req,res)=>{
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




router.get('/admim/articles/edit/:id',admimAuth,(req,res)=>{
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


router.post('/admim/articles/update',admimAuth,(req,res)=>{
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

});

router.get('/admim/articles/page/:num',(req,res)=>{
    let page = req.params.num;
    let offset = 0;


    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = (parseInt(page)-1) * 4;
    }
     
    modelArtigo.findAndCountAll({
            limit:4,
            offset: offset,
            order:[
                ['id','DESC']
            ]
    }).then(articles =>{
        
        let next;
        
        
        if(offset + 4 >= articles.count){
          next =  false;
        }else{
          next = true;   
        }

        let result = {
            page:parseInt(page),
            next: next,
            articles: articles
        }

        modelCategory.findAll().then(categories =>{
            return res.render('admim/articles/page',{result:result,categories:categories});
        });
    });
});


module.exports = router;