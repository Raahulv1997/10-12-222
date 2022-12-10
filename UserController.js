import {StatusCodes} from 'http-status-codes'
import { userSchema } from '../../validation/SchemaValidation.js';
import userModel from "../Models/UserSchema.js";

// 
 export async function  saveUser( req, res){
   
     const  addimage=req.file.filename
   // console.log("addimage----------> "+addimage);
   //    try {

   //      const {error, value}= userSchema.validate(req.body)
   //      if (error){
   //          res.status(StatusCodes.BAD_REQUEST).json(error)
   //      }
   //      else{
   //             req.body=value;
   //             req.body['dob']= new Date(req.body.dob)
   //                const userEmail= await userModel.findOne({email:req.body.email})
   //               if(userEmail){
   //                  res.status(StatusCodes.BAD_REQUEST).json({message:"Email already exist"}) 
   //               }
   //               else{
                  let arr = [];
                      arr= req.body['hobbies']
                       let x = arr.split(',')
                       console.log("yyyyyyyyyyyyyyy-----------"+x)
                       req.body['hobbies'] = x;

                  var {name,dob,city,gender,email,desc,mobile,hobbies} =req.body
console.log(req.body)
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
console.log(name+" "+dob+" "+city+" "+gender+" "+email+" "+desc+" "+mobile+" "+hobbies)
console.log(addimage)

                    const user= new  userModel({
                     name:req.body.name,
                     dob:req.body.dob,
                     city:req.body.city,
                     gender:req.body.gender,
                     email:req.body.email,
                     desc:req.body.desc,
                     mobile:req.body.mobile,
                     userimage:addimage,
                     hobbies:req.body.hobbies
                     })

                    console.log(user)
                    const SavedUser= await user.save();
                    res.status(StatusCodes.OK).json(SavedUser)
                 }
          
      //   }
      
      // // } catch (error) {
      //   console.log(error)
      //   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
      // // }
// }

 export async function getAllUser(req, res){
    try {
       const allUser= await userModel.find();
       res.status(StatusCodes.OK).json(allUser)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
    }
}
export async function getUserById(req, res){
  try {
     const userById= await userModel.findById(req.params.id);
     res.status(StatusCodes.OK).json(userById)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
  }
}

export async function deleteUser(req, res){
 try {
    await userModel.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({})
 } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
 }
}

export async function updateUser(req, res){
 try {
    const id= req.params.id
      const data= req.body;
     const updateduser= await userModel.findByIdAndUpdate(id, data);
     res.status(StatusCodes.OK).json(updateduser)

 } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
 }
}