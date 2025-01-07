const express=require('express')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController')
const router=express.Router()

router.post('/createcategory',requireSignIn,isAdmin,createCategoryController)

router.put('/updatecategory/:id',requireSignIn,isAdmin,updateCategoryController)

router.get('/getcategory',categoryController)

router.get('/singlecategory/:slug',singleCategoryController)

router.delete('/deletecategory/:id',requireSignIn,isAdmin,deleteCategoryController)

module.exports= router