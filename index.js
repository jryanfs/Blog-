const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const categoriesRouter =  require('./categories/categoriesController');
const articlesRouter = require('./articles/articlesController');
const userRouter = require('./user/userController');
const modelArticle = require('./articles/ModelArticle');
const modelCategory =  require('./categories/ModelCategory');  
const modelUser = require('./user/modelUser');
const session = require('express-session');

const app = express();

// Utilizando a view engine EJS
app.set('view engine','ejs');



// Sessions
app.use(session({
    secret: "adivinhe",
    cookie: {
        maxAge:3000000000000000000000000000000
    },
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
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
app.use(userRouter);
app.use(categoriesRouter);
app.use(articlesRouter);




app.get('/',(req,res)=>{
    modelArticle.findAll({
        order:[
            ['id','DESC']
        ],
        limit:4
    },{
        include:[{
            model: modelCategory
        }]
    }).then( articles =>{
        modelCategory.findAll().then(categories =>{
            return res.render('view',{articles: articles,categories:categories});
        });
    });
});

app.get('/:slug',(req,res)=>{
    const slug =  req.params.slug;
    modelArticle.findOne({
        where:{
            slug:slug
        },
        
    }).then(article=>{
        if(article != undefined){
            modelCategory.findAll().then(categories =>{
                return res.render('viewarticle',{article: article,categories:categories});
            });
        }else{
            return res.redirect('/');
        }
    }).catch(()=>{
        return res.redirect('/');
    })
})



app.get('/categories/:slug',(req,res)=>{
    let slug = req.params.slug;
    modelCategory.findOne(
        { 
            where :{
        slug:slug
        },
        include : [{model: modelArticle}]
    }).then(category=>{
        if(category != undefined){
            modelCategory.findAll().then( categories =>{
                return res.render('viewcategory',{articles:category.articles,categories:categories});
            })
        }else{
            return res.redirect('/');
        }
    }).catch(() =>{
        return res.redirect('/');
    })

});
// Porta de conexão
app.listen(3333);