const {Router} = require('express')


const {createUserController, updateUserController,getUserController} = require('../controllers/user.controller.js')


const routes = Router()


routes.post('/api/v1/user', createUserController)
routes.put('/api/v1/user/:id', updateUserController)
routes.get('/api/v1/user/:id', getUserController)


module.exports = routes