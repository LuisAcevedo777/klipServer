const {Sequelize} = require('sequelize')
require('dotenv').config()
const db = new Sequelize(process.env.DATABASE_URL,{
    
    port: 5432,
    database: 'railway', //'klubserver',
    username: 'postgres',
    password: 'YzzvfsBqepLlZKVgIuEXKUFiwEJyZOpZ',//'root', 
    dialect: 'postgres',
    host: 'meticulous-empathy.railway.internal', // 'localhost',
    logging: false
})

module.exports = db


