const postModel = require('../models/post.model.js')

class postServices{


 static async getAllPost(){

  try{
    const postGetted = await postModel.findAll()
    
       return postGetted
        }catch(error){throw error}
    
} 



 static async createOnePost(newPost){
try{
  const createdPost = await postModel.create(newPost)
  return createdPost

}
catch(error){
throw error

}



} 

static async updatePost(newPost, id){
  try{
    const updatedPost = await postModel.update(newPost,{where:{id}})
    return updatedPost
  
  }
  catch(error){
  throw error
  
  }
  
  
  
  } 

}

module.exports = postServices