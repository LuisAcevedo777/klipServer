const {Router} = require('express')

const {createAnswerController,getAnswerController,updateAnswerController,deleteAnswerController} = require('../controller/answer.controller.js')


const routes = Router()

routes.get('/api/v1/answer', getAnswerController)
routes.post('/api/v1/answer', createAnswerController)
routes.delete('/api/v1/answer/:id', deleteAnswerController)
routes.put('/api/v1/answer/:id', updateAnswerController)





module.exports = routes