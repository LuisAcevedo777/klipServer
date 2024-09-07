const {DataTypes} = require('sequelize')
const db = require('../utils/db')


const PostFilePivot = db.define('post_file_pivot',{

id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
idPost:{type: DataTypes.INTEGER},
idFile:{type: DataTypes.INTEGER}

})

module.exports = PostFilePivot