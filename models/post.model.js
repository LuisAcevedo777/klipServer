const {DataTypes} = require('sequelize')
const db = require('../utils/db')


const Post = db.define('posts',{

    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, allowNull:false},
    archivos:{type: DataTypes.STRING(300)},
    mensaje:{type: DataTypes.STRING(500)},
    
},
{timestamps: false, updateAt:false,createAt: 'fecha'}

)

module.exports = Post