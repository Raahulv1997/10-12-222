import express from 'express';
// var bodyParser = require('body-parser')
import bodyParser from 'body-parser'
// import upload from '../../index.js';
import { deleteUser, getAllUser, getUserById, saveUser, updateUser } from '../Controllers/UserController.js';
import multer from "multer";
import path from 'path'

import {fileURLToPath} from 'url'
 const app=express();
app.use(express.static('images'))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
 const userRouter= express.Router();




 const __filename=fileURLToPath(import.meta.url);
 const __dirname= path.dirname(__filename);
   
// const storage=multer.diskStorage({
//     destination:function(req, file, cb){
//     cb(null, 'images/')
//     },
//     filename:function(req,file,cb){
//        const ext= path.extname(file.originalname)
//        console.log("ext----"+ext)
//      const name=Date.now();
//      console.log("name-----"+name)
//      cb(null, name+ ext)
//     }
//   })
  
//    const upload= multer({storage:storage })


var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {  
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  var upload = multer({
    storage: storage
    // dest:'./public/catgory_images'
  })
   

 userRouter.post('/user',upload.single('userimage'), saveUser)
// userRouter.post('/user', saveUser)
 userRouter.get('/user', getAllUser)
 userRouter.get('/user/:id', getUserById);
 userRouter.delete('/user/:id', deleteUser);
 userRouter.put('/user/:id', updateUser);

 export default userRouter;