const {DataTypes} = require('sequelize')
const db = require('../utils/db')


const User = db.define('users',{

id:{type: DataTypes.INTEGER, primaryKey:true,autoIncrement:true,allowNull:false},
name:{type: DataTypes.STRING(30),allowNull:false},
lastname:{type: DataTypes.STRING(30),allowNull:false},
email:{type: DataTypes.STRING(60),allowNull:false, unique:true, validate:{isEmail:true}},
password:{type: DataTypes.STRING(30),allowNull:false},
})

module.exports = User