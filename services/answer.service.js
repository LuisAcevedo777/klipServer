const answerModel = require('../models/answer.model.js')

class answerServices{


 static async getOneAnswer(){


   try{
const answerCreated = await answerModel.create(newAnswer)
return answerCreated

}catch(error){throw error}

        


} 

 static async createOneAnswer(newAnswer){
try{
const answerCreated = await answerModel.create(newAnswer)
return answerCreated

}catch(error){throw error}




} 

 static async deleteAnswer(id){



    try{
        const answerDelete = await answerModel.destroy({where:{id}})
        return answerDelete
        
            }catch(error){throw error}


} 
 static async updateAnswer(answerToUpdate,id){



    try{ 
        const result = await answerModel.update(answerToUpdateToUpdate,{where:{id}})
        return result
      }
      catch(error){throw error}
    


} 



}

module.exports = answerServices