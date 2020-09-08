const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const categoriesRouter =  require('./categories/categoriesController');
const articlesRouter = require('./articles/articlesController');
const modelArticle = require('./articles/ModelArticle');
const modelCategory =  require('./categories/ModelCategory');  
const articles = require('./articles/ModelArticle');

const app = express();

// Utilizando a view engine EJS
app.set('view engine','ejs');

// Utilizando arquivos (STATIC)
app.use(express.static('public'));

// Utilizando o body-parser para formulários e para JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Use Router categories

// Database connection
connection
        .authenticate()
        .then(()=>{
            console.log("Conexão feita com sucesso!");
        }).catch((error)=>{
            console.log(error);
        });


// Routes
app.use(categoriesRouter);
app.use(articlesRouter);
app.get('/',(req,res)=>{
    modelArticle.findAll({
        order:[
            ['id','DESC']
        ]
    },{
        include:[{
            model: modelCategory
        }]
    }).then( articles =>{

        return res.render('view',{ articles: articles});
    });
});

app.get('/:slug',(req,res)=>{
    const slug =  req.params.slug;
    modelArticle.findOne({
        where:{
            slug:slug
        }
    }).then(article=>{
        if(article != undefined){
            return res.render('viewarticle',{article:article});
        }else{
            return res.redirect('/');
        }
    }).catch(()=>{
        return res.redirect('/');
    })
})
// Porta de conexão
app.listen(3333);