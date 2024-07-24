const fileModel = require('../models/file.model.js')

class fileServices{


 static async getFile(){




   try{
const answerCreated = await answerModel.create(newAnswer)
return answerCreated

}catch(error){throw error}

} 

 static async createFile(){


    try{
        const answerCreated = await answerModel.create(newAnswer)
        return answerCreated
        
        }catch(error){throw error}
        


} 

 static async deleteFile(){



    try{
        const answerDelete = await answerModel.destroy({where:{id}})
        return answerDelete
        
            }catch(error){throw error}



} 
 static async updateFile(){





} 



}

module.exports = fileServices