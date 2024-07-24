const userServices = require('../services/user.service')

const getUserController=async(req,res)=>{

    try{
        const getUser = await userServices.getOneUser()
        res.json(getUser)

    }catch(error){res.status(400).json(error)}

}

const createUserController=async (req,res)=>{
try{

    const newUser = req.body
        const userCreated = await userServices.createOneUser(newUser)
        res.status(201).json(results)
}catch(error){res.status(400).json(error)}


}

const updateUserController=async(req,res)=>{

    try{
            const {id} = req.params
            const userToUpdate = req.body
           const userUpdated = await userServices.updateOneUser(userToUpdate,id)
           res.status(204).send()

    }catch(error){res.status(400).json(error)}

}


module.exports = {

    getUserController,
    createUserController,
    updateUserController
}