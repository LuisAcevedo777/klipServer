const {Sequelize} = require('sequelize')
require('dotenv').config()
const db = new Sequelize(process.env.DATABASE_URL,{
    
    port: 5432,
    database: 'railway',
    username: 'postgres',
    password: 'FNQscGuLKlFDKyZgqoWAMgACipZupMkL',
    dialect: 'postgres',
    host: 'meticulous-empathy.railway.internal',
    logging: false

})

module.exports = db

/*postgresql://klubserver_user:gKDEGOzY4LQclYPhqs0b6w2sccUSsOaQ@dpg-cregosrgbbvc73bqqdn0-a.oregon-postgres.render.com/klubserver*/
