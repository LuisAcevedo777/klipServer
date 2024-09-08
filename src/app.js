const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const multer = require('multer')
const fs = require('node:fs')
const path = require('path')
const db = require('../utils/db')
const userRoutes = require('../routes/user.route')
const answerRoutes = require('../routes/answer.route')
const postRoutes = require('../routes/post.route')
const fileRoutes = require('../routes/file.route')
const initModel = require('../models/initModels')
const postServices = require('../services/post.service')




initModel()

db.authenticate().then((req,res)=>{console.log('db authenticated')}).catch((error)=>{console.log(error)})
db.sync({force: true}).then((req,res)=>{console.log('db sync')}).catch((error)=>{console.log(error)})


const PORT = process.env.PORT  || 8000




  let archivos



//multer

const upload = multer({dest: './public'})




const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.json())
app.use(morgan('dev'))
app.use(postRoutes)



/*app.post('/images/single', upload.single('imagenPerfil'), (req,res)=>{
    console.log(req.file);
    saveImage(req.file)
    res.send('Termina')  })  //info del fichero en req.file*/

  //consulta para Crear post

   
 app.post('/api/v1/files/multi', upload.array('archivos'),async (req,res)=>{
  
  let mensaje = req.body.mensaje
  let files = req.files
 
  files.map(saveImage)  
   await postServices.createOnePost({'archivos': archivos, 'mensaje': mensaje})
  .then(()=>{console.log('POST creado exitosamente')})
  .then(res.status(201).send(archivos))
  .catch((error)=>{console.log(error)})
  
    
  }
)

const firstGet = app.get('/',(req,res)=>{

  const htmlResponse = `
  
  <html>
  <head>
  <title>Node y express</title>
  <body><h1>soy un proyecto backend</h1></body>
  </head></html>
  `
  res.send(htmlResponse)
})

const responseServer = app.post('/api/v1/files', upload.single('archivos'), singlePost)


const getPromiseServer = app.get('/api/v1/files', getPromise )

async function saveImage(file){
   
const newPath = `./public/${file.originalname}`
await fs.renameSync(file.path, newPath)
archivos.push(path.join(__dirname,newPath))
return newPath
}


//Functions

async function singlePost(req,res){
  
  let mensaje = req.body.mensaje
   let file = req.file

   if(file){ 
   saveImage2(file)  
  const postServicesResponse = await postServices.createOnePost({'archivos': archivos, 'mensaje': mensaje})
  .then((res)=>{console.log('POST creado exitosamente')})
  .catch((error)=>{console.log(error)})
}else if(mensaje){

  await postServices.createOnePost({'archivos': '', 'mensaje': mensaje})
    .then(()=>{console.log('POST creado exitosamente')})
    .catch((error)=>{console.log(error)})
}else{

 console.log('no se envió nada!') 
}
}

async function getPromise(req,res){
  try{ 
      const response =await postServices.getAllPost()
      res.json(response)
     
      }
 catch(error){res.status(400).json(error)}

}




function saveImage2(file){
   
  const newPath = `./public/${file.originalname}`
  fs.renameSync(file.path, newPath)
  archivos = path.join(__dirname,newPath)
  return newPath
  }









console.log(__dirname)
app.listen(PORT,()=>{console.log(`LISTENING IN PORT ${PORT}`)})
