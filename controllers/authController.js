const { hash } = require("bcrypt")
const userModel = require("../models/userModel")
const { hashPassword, comparePassword } = require("../helpers/authHelper")
const JWT = require('jsonwebtoken')

const registerController = async (req,res)=>{
    try{
        const {name, email, password, phone, address, answer} = req.body
        if(!name){
            return res.send({error:"Name is required"})
        }
        if(!email){
            return res.send({error:"Email is required"})
        }
        if(!password){
            return res.send({error:"Password is required"})
        }
        if(!phone){
            return res.send({error:"Phone is required"})
        }
        if(!address){
            return res.send({error:"Address is required"})
        }
        if(!answer){
            return res.send({error:"Answer is required"})
        }

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success : true,
                message : "Already registered Please Login"
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await new userModel({name, email, phone, address, answer, password:hashedPassword}).save()
        res.status(201).send({
            success : true,
            message : "User registered successfully",
            user
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in Registration",
            error
        })
    }

}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send({ error: "Invalid email or password" });
        }

        const user = await userModel.findOne({ email }); 
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered.",
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).send({
            success: true,
            message: "Login Successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        });
    }
};

const forgotPasswordController=async (req,res)=>{
    try{
        const {email,answer,newPassword}=req.body
        if(!email)
        {
            res.status(400).send({message:"Email is required"})
        }
        if(!newPassword)
            {
                res.status(400).send({message:"Password is required"})
            }
        if(!answer)
                {
                    res.status(400).send({message:"Answer is required"})
                }
            const user=await userModel.findOne({email,answer})
            if(!user)
            {
                return res.status(404).send({
                    success:false,
                    message:"Wrong Email or Answer"
                })                
            }
            const hashed=await hashPassword(newPassword)
            await userModel.findByIdAndUpdate(user._id,{password:hashed})
            res.status(200).send({
                success:true,
                message:"Password Reset Successfully"
            })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something Went Wrong",
            error
        })
    }
}

const testController = async(req,res)=>{
    try{
        res.send("middleware tested")
    }catch(error){
        console.log(error)
    }
}

module.exports = {registerController, loginController, testController, forgotPasswordController}