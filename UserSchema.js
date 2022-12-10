import mongoose  from "mongoose";

  const UserSchema=new mongoose.Schema({
    name:{type:String, required:true},
    dob:{type:Date, required:true},
    city:{type:String, required:true},
    desc:{type:String, required:true},
    email:{type:String, required:true},
    mobile:{type:String, required:true},
    gender:{type:String, required:true},
    hobbies:{type:Array, required:true},
    userimage:{type:String}

  })

  const userModel= mongoose.model("user", UserSchema)
  export default userModel;

  