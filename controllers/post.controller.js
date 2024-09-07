const postServices = require('../services/post.service')

const getPostController=async(req,res)=>{

    try{
const getPost = await postServices.getAllPost()
res.json(getPost)

    }catch(error){res.status(400).json(error)}

}
/*
const createPostController=(req)=>{

const newPost = req
const postCreated = postServices.createOnePost(newPost)


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

}*/



module.exports= getPostController