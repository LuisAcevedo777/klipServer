const userModel = require('../models/user.model.js')
class userServices{

     static async getUser(){

      try{
        const userGetted = await userModel.getByPk()
        return userGetted
        
            }catch(error){throw error}
        
        



    } 
 static async createOneUser(newUser){

    
    try{
const userCreated = await userModel.create(newUser)
return userCreated

    }catch(error){throw error}



} 

 static async updateUser(userToUpdate,id){
try{ 
  const result = await userModel.update(userToUpdate,{where:{id}})
  return result
}
catch(error){throw error}

} 



}


module.exports = userServices