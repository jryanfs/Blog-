const sequelize = require('sequelize');
const connection = require('../database/connection');
const ModelCategory = require('../categories/ModelCategory');


const articles = connection.define('articles',{
    title:{
        type: sequelize.STRING,
        allowNull: false
    },
    slug : {
        type: sequelize.STRING,
        allowNull: false
    },
    body : {
        type: sequelize.TEXT,
        allowNull: false
    }
})

ModelCategory.hasMany(articles);
articles.belongsTo(ModelCategory);



module.exports = articles;