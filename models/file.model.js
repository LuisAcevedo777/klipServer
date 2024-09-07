const {DataTypes} = require('sequelize')
const db = require('../utils/db')


const File = db.define('files',{

id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
name:{type:DataTypes.STRING(60)}

})

module.exports = File