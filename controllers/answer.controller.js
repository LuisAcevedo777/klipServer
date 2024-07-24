const answerServices = require('../services/answer.service')

const getAnswerController=()=>{

try{
    
}catch(error){res.status(400).json(error)}

}

const createAnswerController=async(req,res)=>{

try{
    const newAnswer = req.body
const answerCreated = await answerServices.createOneAnswer(newAnswer)
res.status(201).send(answerCreated)


}catch(error){res.status(400).json(error)}

}
const deleteAnswerController=()=>{

try{}catch(error){res.status(400).json(error)}

}
const updateAnswerController=async(req,res)=>{

try{
    const {id} = req.params
    const answerToUpdate = req.body
   const answerUpdated = await answerServices.updateOneAnswer(answerToUpdate,id)
   res.status(204).send()

}catch(error){res.status(400).json(error)}

}


module.exports = {

    getAnswerController,
    createAnswerController,
    deleteAnswerController,
    updateAnswerController
}