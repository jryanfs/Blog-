const express = require('express');
const  router = express.Router(); 
const slugify = require('slugify');
const ModelCategory =  require('./ModelCategory');
const admimAuth = require('../middlewares/admimAuth');




router.get('/admim/categories/new',admimAuth,(req,res)=>{
    return res.render('/admim/categories/new');
});


router.post('/admim/categories/save',admimAuth,(req,res)=>{
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

router.get('/admim/categories',admimAuth,(req,res)=>{

    ModelCategory.findAll().then(categories=>{

        return res.render('admim/categories/category',{categories:categories});
    })

});

router.post('/admim/categories/delete',admimAuth,(req,res)=>{
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            ModelCategory.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                return res.redirect("/admim/categories");
            }).catch(()=>{
                return res.redirect("/admim/categories")
            });

        }else{
            return res.redirect("/admim/categories");
        }
    }else{
        return res.redirect("/admim/categories");
    }
});


router.get('/admim/categories/edit/:id',admimAuth,(req,res)=>{
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



router.post('/admim/categories/update',admimAuth,(req,res)=>{
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
            return res.redirect('/admim/categories');
        });

});



module.exports = router;

