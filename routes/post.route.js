const {Router} = require('express')

const getPostController = require('../controllers/post.controller.js')


const routes = Router()

/*routes.post('/api/v1/post', createPostController)*/
routes.get('/api/v1/post', getPostController)
/*routes.delete('/api/v1/post/:id', deletePostController)
routes.put('/api/v1/post/:id', updatePostController)*/
module.exports = routes
