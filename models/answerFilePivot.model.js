const {DataTypes} = require('sequelize')
const db = require('../utils/db')


const AnswerFilePivot = db.define('answer_file_pivot',{

id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
idAnswer:{type: DataTypes.INTEGER},
idFile:{type: DataTypes.INTEGER}
})

module.exports = AnswerFilePivot