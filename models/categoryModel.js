const {name} = require('ejs')
const {type} = require('express/lib/response')
const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})

module.exports=mongoose.model("Category",categorySchema)
