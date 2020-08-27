const express = require('express');
const  Router = express.Router(); 


Router.get('/categories',(req,res)=>{
    return res.send('Categorias');
});



module.exports = Router;

