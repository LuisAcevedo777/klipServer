const postServices = require('../services/post.service')

const getPostController=async(req,res)=>{

    try{
const getPost = await getPostController.getOnePost()
res.json(getPost)

    }catch(error){res.status(400).json(error)}

}

const createPostController=async(req,res)=>{
    try{
const newPost = req.body
const postCreated = await postServices.createOnePost()
res.status(201).send(postCreated)

    }catch(error){res.status(400).json(error)}


}
const deletePostController=async(req,res)=>{
    try{
    const {id} = req.params
    const postDeleted = await postServices.deleteOnePost(id)
    res.status(204).send()

    }catch(error){res.status(400).json(error)}


}
const updatePostController=async(req,res)=>{

    try{
        const {id} = req.params
        const postToUpdate = req.body
       const postUpdated = await postServices.updateOnePost(postToUpdate,id)
       res.status(204).send()
    }catch(error){res.status(400).json(error)}

}


module.exports = {

    getPostController,
    createPostController,
    deletePostController,
    updatePostController
}