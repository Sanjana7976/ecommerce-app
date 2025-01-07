const express = require('express')
const router =  express.Router()
const {registerController, loginController, testController, forgotPasswordController} = require('../controllers/authController')
const {requireSignIn, isAdmin} = require('../middlewares/authMiddleware')

router.post('/register', registerController)

router.post('/login', loginController)

router.post('/forgotpassword',forgotPasswordController)


router.get('/test', requireSignIn, isAdmin, testController)

router.get('/userauth', requireSignIn, (req, res)=>{
    res.status(200).send({
        ok:true
    })
})

router.get('/adminauth', requireSignIn, isAdmin, (req, res)=>{
    res.status(200).send({
        ok:true
    })
})

module.exports = router