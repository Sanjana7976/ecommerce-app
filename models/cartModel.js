const mongoose=require('mongoose')
const cartSchema=new mongoose.Schema({
   name:{
      type:String,
      required:true,
      trim:true
  },
  slug:{
      type:String,
      required:true,
      unique:true
  },
  price:{
      type:Number,
      required:true
  },
  quantity:{
      type:Number,
      required:true
  },
  description:{
      type:String,
      required:true,
      trim:true
  },
  category:{
      type:mongoose.ObjectId,
      ref:'category',
      required:true
  },
  photo:{
      data:Buffer,
      contentType:String
  }
 
    
},{timestamps:true})
module.exports=mongoose.model("Cart",cartSchema)

