const categoryModel = require('../models/categoryModel')
const slugify = require('slugify')

const createCategoryController=async (req,res) => {
    try{
        const {name} = req.body
        if(!name)
        {
            return res.status(401).send({
                message:"Name is Required"
            })
        }

        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: "Category Already Exist"
            })
        }

        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"New Category Created",
            category
        })

    }catch(error){

        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }
}

const updateCategoryController = async (req,res) => {
    try{

        const {name} = req.body
        const {id} = req.params        
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category
        })

    }catch(error){

        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })

    }
    
}

const categoryController=async (req,res)=>{
    try{

        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All Categories List",
            category
        })

    }catch(error){

        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all categories"
        })

    }
}

const singleCategoryController=async (req,res)=>{

    try{

        const category=await categoryModel.findOne({slug:req.params})
        res.status(200).send({
            success:true,
            message:"Get Single Category",
            category
        })

    }catch(error){

        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single category"
        })
    }
   
}

const deleteCategoryController=async (req,res)=>{

    try{
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category deleted successfully",
            
        })

    }catch(error){

        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while deleting category"
        })
    }
}

module.exports = {createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController}

