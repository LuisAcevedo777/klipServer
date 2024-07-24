const {DataTypes} = require('sequelize')
const db = require('../utils/db')


const Post = db.define('posts'{

    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true, allowNull:false},
    description:{type: DataTypes.STRING(70)},
    author:{type: DataTypes.STRING(20),allowNull:false}

})

module.exports = Post