const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const requireSignIn = async(req, res, next) => {
    try {
        const Decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    
        req.user = Decode;

        next();
        
    } catch (error) {
        console.log(error);
    }
};

const isAdmin = async(req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if(user.role !== 1) {
            return res.status(200).send({success:false,message:"You are not authorized to access Admin page"});
        }
        else {
            next();
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:"Server error",error});
    }
};
const isUser=async(req,res,next)=>{
    try{
        const user=await userModel.findById(req.user.id);
        if(user.role!==0){
            return res.status(200).send({success:false,message:"You are not authorized to access User page"});
        }
        else{
            next();
        
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({success:false,message:"Server error",error});
    }
}

const authMiddlewares = {
    requireSignIn,
    isAdmin,
    isUser
}

module.exports = authMiddlewares;