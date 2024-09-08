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
const { error } = require('node:console')




initModel()

db.authenticate().then((req,res)=>{console.log('db authenticated')}).catch((error)=>{console.log(error)})
db.sync({alter: true}).then((req,res)=>{console.log('db sync')}).catch((error)=>{console.log(error)})


const PORT = process.env.PORT  || 8000
const app = express()
const publicDir = path.join(__dirname,'public')


  let archivos = []
//multer

const upload = multer({dest: publicDir})

app.use(cors())
app.use(express.static(publicDir));
app.use(express.json())
app.use(morgan('dev'))
app.use(postRoutes)



   
 app.post('/api/v1/files/multi', upload.array('archivos'),async (req,res)=>{
  
  let mensaje = req.body.mensaje
  let files = req.files

  archivos = []
 
  files.map(saveImage) 
  
  try{ 
   await postServices.createOnePost({'archivos': archivos, 'mensaje': mensaje})
  console.log('POST creado exitosamente')
  .then(res.status(201).send("post Creado"))
  res.status(201).send('post creado')
  }catch(error){
  
     console.log('error creando post:', error)
     res.status(500).send('error creando post')
  }
})



//single post

app.post('/api/v1/files', upload.single('archivos'), async (req, res) => {
  const mensaje = req.body.mensaje;
  const file = req.file;

  if (file) {
    saveImage(file);
    try {
      await postServices.createOnePost({ 'archivos': archivos, 'mensaje': mensaje });
      console.log('POST creado exitosamente');
      res.status(201).send('Post creado');
    } catch (error) {
      console.log('Error creando post:', error);
      res.status(500).send('Error creando post');
    }
  } else if (mensaje) {
    try {
      await postServices.createOnePost({ 'archivos': '', 'mensaje': mensaje });
      console.log('POST creado exitosamente');
      res.status(201).send('Post creado');
    } catch (error) {
      console.log('Error creando post:', error);
      res.status(500).send('Error creando post');
    }
  } else {
    console.log('No se envió nada!');
    res.status(400).send('No se envió nada!');
  }
});

//get listar archivos

app.get('/api/v1/files', (req,res)=> { 
  fs.readdir(publicDir, (err, files)=>{

 if(err){
  console.error('Error leyendo el directorio:', err.message)
  return res.status(500).json({error: 'error leyendo el directorio'})
 }

 const fileUrls = files.map(file=>({

     name: file,
     url: `/public/${file}`

 }))
  res.json(fileUrls)

  })
    })


    //get RUTA RAIZ

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

function saveImage(file){
   
const newPath = path.join(publicDir, file.originalname)
fs.renameSync(file.path, newPath)
archivos.push(newPath)
archivos.push(newPath)
}


//Functions




console.log(__dirname)
app.listen(PORT,()=>{console.log(`LISTENING IN PORT ${PORT}`)})
