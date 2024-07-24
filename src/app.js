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
const initModel = require('../models/initModel')

initModel()

db.authenticate().then((req,res)=>{console.log('db authenticated')}).catch((error)=>{console.log(error)})
db.sync('auth').then((req,res)=>{console.log('db sync')}).catch((error)=>{console.log(error)})


const PORT = process.env.PORT || 8000

//multer

const upload = multer({dest: '/public'})



const app = express()

app.use(express.static(path.join(__dirname,'../public')));
app.use(userRoutes,answerRoutes,postRoutes,fileRoutes)
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


app.post('/images/single', upload.single('imagenPerfil'), (req,res)=>{
    console.log(upload);
    saveImage(req.file)
    res.send('Termina')  })  //info del fichero en req.file

    app.post('/images/multi', upload.array('photos',10), (req,res)=>{
        console.log(req.files);
        req.files.map(saveImage)
        res.send('Termina Multi')  })


        app.get('/images/single/:id',(req,res)=>{
            try{ 
              
                res.sendFile(path.join(__dirname,"../public/b.mp3"))}
           catch(error){res.status(400).json(error)}
        
        })

function saveImage(file){
   
const newPath = `./uploads/${file.originalname}`
fs.renameSync(file.path, newPath)
return newPath
}


app.listen(PORT,()=>{console.log(`LISTENING IN PORT ${PORT}`)})