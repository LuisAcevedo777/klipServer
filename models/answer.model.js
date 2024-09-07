const {DataTypes} = require('sequelize')
const db = require('../utils/db')


const Answer = db.define('answers',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
    content:{type: DataTypes.STRING(70)},
    author:{type: DataTypes.STRING(30),allowNull:false},
    postId:{type: DataTypes.INTEGER,allowNull:false,field:'post_id'},
    createAt:{type: DataTypes.DATE,allowNull:false},


})

module.exports = Answer