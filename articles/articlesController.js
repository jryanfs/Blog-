const express = require('express');
const Router =  express.Router();


Router.get(('/articles'),(req,res)=>{
    return res.send('Articles');
})






module.exports = Router;


