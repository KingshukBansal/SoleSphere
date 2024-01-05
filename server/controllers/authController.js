const userModel=require('../models/userModel');
const {hashPassword,bcryptCompare}=require('../utils/authUtils');
const JWT = require('jsonwebtoken');
const registerController=async(req,res)=>{
try{
    // console.log(req.body);
    const {name,email,password,phone,address,answer}=req.body;
    if(!name||!email||!password||!phone||!address||!answer){
        return res.status(400).send({success:false,message:"Please enter all fields"});

    }

    const existingUser= await userModel.findOne({email});
    if(existingUser){
        return res.status(400).send({success:false,message:"User already exists"});
    }
    const hashedPassword=await hashPassword(password);
    const hashedAnswer=await hashPassword(answer);
    console.log(hashedPassword);
    const user =await new userModel({
        name,
        email,
        password:hashedPassword,
        phone,
        address,
        answer:hashedAnswer
    }).save();

    return res.status(200).send({success:true,message:"User registered successfully",user});
}
catch(err){
    console.log(err);
    return res.status(500).send({success:false,
        message:"Server error",
        err
    });
}
}

const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).send({success:false,message:"Please enter all fields"});
    
        }
        const existingUser= await userModel.findOne({email});

        if(!existingUser){
            return res.status(400).send({success:false,message:"User does not exist"});
        }
        const isMatch=await bcryptCompare(password,existingUser.password);
        if(!isMatch){
            return res.status(400).send({success:false,message:"Invalid credentials"});
        }

        const token=JWT.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        return res.status(200).send({success:true,message:"User logged in successfully",user:{
            name:existingUser.name,
            email:existingUser.email,
            phone:existingUser.phone,
            address:existingUser.address,
            role:existingUser.role,
        },token});



    }
    catch(err){
        console.log(err);
        return res.status(500).send({success:false,
            message:"Server error",
            err
        });
    }
    }

const forgotPasswordController=async(req,res)=>{
    try{
        const {email,answer,newPassword}=req.body;
        if(!email||!answer||!newPassword){
            return res.status(400).send({success:false,message:"Please enter all fields"});
    
        }
        const existingUser= await userModel.findOne({email});

        if(!existingUser){
            return res.status(400).send({success:false,message:"User does not exist"});
        }
        const isMatch=await bcryptCompare(answer,existingUser.answer);

        if(!isMatch){
            return res.status(400).send({success:false,message:"Incorrect answer"});
        }
        const hashedPassword=await hashPassword(newPassword);

        await userModel.findByIdAndUpdate(existingUser._id,{password:hashedPassword});
        return res.status(200).send({success:true,message:"Password updated successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({success:false,
            message:"Server error",
            err
        });
    }
    }


 const testController = async(req, res) => {
        try {
            // Your middleware logic here
            console.log("Middleware logic executed successfully");

            // Your controller logic here
            return res.status(200).send({ success: true, message: "Test controller executed successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ success: false, message: "Server error", err });
        }
    };


const authController={registerController,loginController,forgotPasswordController,testController}

module.exports=authController;