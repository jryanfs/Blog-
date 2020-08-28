const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const categoriesRouter =  require('./categories/categoriesController');
const articlesRouter = require('./articles/articlesController');
const ModelArticle =  require('./articles/ModelArticle');
const MoldelCaregory = require('./categories/ModelCategory');

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

// Porta de conexão
app.listen(3333);