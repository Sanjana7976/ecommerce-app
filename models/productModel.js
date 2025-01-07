const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
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
        ref:'Category',
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    }
   
},{timestamps:true})

module.exports=mongoose.model('product',productSchema)