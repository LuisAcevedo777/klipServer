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

 static async deleteOnePost(id){


  try{
    const postDelete = await postModel.destroy({where:{id}})
    return postDelete
    
        }catch(error){throw error}
    



} 
static async updateOnePost(postToUpdate,id){


  try{ 
    const result = await postModel.update(postToUpdate,{where:{id}})
    return result
  }
  catch(error){throw error}


} 



}

module.exports = postServices