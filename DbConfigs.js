import mongoose from 'mongoose'
import 'dotenv/config'
  export function DbConfigs(){

  
    mongoose.connect(process.env.DB_URL)
   const dbConnection= mongoose.connection;
   dbConnection.once('connected',()=>{
    console.log("Db is connected")
   })
   dbConnection.on('error',()=>{
    console.log("Error in db connections")
   })
 }


