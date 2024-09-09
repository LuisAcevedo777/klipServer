const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const multer = require('multer')
const fs = require('node:fs')
const path = require('path')
const db = require('../utils/db')
const initModel = require('../models/initModels')
const postServices = require('../services/post.service')





initModel()

db.authenticate().then((req,res)=>{console.log('db authenticated')}).catch((error)=>{console.log(error)})
db.sync({force: true}).then((req,res)=>{console.log('db sync')}).catch((error)=>{console.log(error)})


const PORT = process.env.PORT  || 8000
const app = express()
const publicDir = path.join(__dirname,'public')


  //let archivos = ''
//multer

const upload = multer({dest: publicDir})

app.use(cors())
app.use(express.static(publicDir));
app.use(express.json()) 
app.use(morgan('dev'))



                                                       //MULTI POST


   
 app.post('/api/v1/files/multi/post', upload.array('archivos'),async (req,res)=>{
  
  let mensaje = req.body.mensaje
  let files = req.files

  archivos = ''
 
  files.map(saveImage) 
  
  try{ 
   await postServices.createOnePost({'archivos': archivos, 'mensaje': mensaje})
  console.log('POST creado exitosamente')
    res.status(201).send('post creado')
  }catch(error){
       console.log('error creando post:', error)
     res.status(500).send('error creando post')
  }
})



                                                          //single post




app.post('/api/v1/files/post', upload.single('archivos'), async (req, res) => {
  const mensaje = req.body.mensaje;
  const file = req.file;

  if (file) {
       try {
      const postOnDataBase = await postServices.createOnePost({ 'archivos': file.originalname, 'mensaje': mensaje });
      if(!postOnDataBase){return 'archivo no guardado en base de datos'}
      const archivo = saveImage(file, postOnDataBase.id);
      const updatePost = await postServices.updatePost({'archivos': postOnDataBase.id + "." + file.originalname}, postOnDataBase.id)
      console.log(postOnDataBase);
      res.status(201).send();
    } catch (error) {
      res.json(error);
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



function saveImage(file, id){
   const nameWithId = id + "."+ file.originalname
  const newPath = path.join(publicDir, nameWithId)
  fs.renameSync(file.path, newPath)

  return file.originalname  // devuelve el nombre del archivo

  //archivos.push(newPath)
  }









                                                               //get listar archivos



app.get('/api/v1/files',async (req,res)=> { 

 const posts = await postServices.getAllPost()
 if(!posts){
  console.error('No hay posts o no se pudo encontrar ninguno:', err.message)
  return res.status(500).json({error: 'no hay posts o no se pudo encontrar'})
 }
 fs.readdir(publicDir, (err, files)=>{        //lee en public todos lor archivos

  if(err){
   console.error('Error leyendo el directorio:', err.message)
   return res.status(500).json({error: 'error leyendo el directorio'})
  }
 const fileUrls = files.map(file=>({         
     id:  parseInt(file.split('.')[0]),
     name: file,
     url: `/${file}`

 }))
 console.log(posts)
  res.json(posts)

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









console.log(__dirname)
app.listen(PORT,()=>{console.log(`LISTENING IN PORT ${PORT}`)})

/*
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

   
  /*
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









app.listen(PORT,()=>{console.log(`LISTENING IN PORT ${PORT}`)})

*/