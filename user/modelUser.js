const sequelize = require('sequelize');
const connection = require('../database/connection');


const user =  connection.define('users',{
    email:{
        type: sequelize.STRING,
        allowNull: false
    },
    password:{
        type: sequelize.STRING,
        allowNull : false
    }
});


module.exports = user;