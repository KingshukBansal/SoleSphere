
const productModel = require("../models/productModel");
const fs=require('fs');

const slugify = require("slugify");


const createProduct = async (req, res) => {
    try {
        console.log(req.formData);
    const {name,price,description,quantity,category,shipping}=req.fields;
    const {photo}=req.files;
    if(!name||!price||!description||!quantity||!category||!shipping||!photo){
        return res.status(400).send({success:false,error:"all fields are required"});
    }
    if(photo && photo.size>1000000){
        return res.status(400).send({success:false,error:"file should be less than 1mn"});
    }
    const product = await new productModel({...req.fields, slug:slugify(name)});
    if(photo){
        product.photo.data=fs.readFileSync(photo.path);
        product.photo.contentType=photo.type;
    }
    await product.save();
    res.status(201).send({success:true,message:"product created successfully",product});

    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, error: error.message, messay: "internal server error" });
    }
}

const getAllProducts=async(req,res)=>{
    try {
        const products=await productModel.find({}).populate('category').select('-photo').limit(10).sort({createdAt:-1});
        res.status(200).send({success:true,message:"all products get fetched",products});
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, error: error.message, messay: "internal server error" });
    }
}
const getSingleProduct=async(req,res)=>{
    try {
        const product=await productModel.findById(req.params.pid).select('-photo');
        if(!product){
            return res.status(400).send({success:false,message:"product not found"});
        }
        res.status(200).send({success:true,message:"product get fetched",product});
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, error: error.message, messay: "internal server error" });
    }
}
const getPhoto=async(req,res)=>{
    try{
    const photo=await productModel.findById(req.params.pid).select('photo');
    if(photo.photo.data){

        res.set('Content-Type',photo.photo.contentType);
        res.send(photo.photo.data);
    }
    else{
        res.status(400).send({success:false,message:"no photo found"});
    }
    }
    catch(error){
        console.log(error);
        res.status(400).send({ success: false, error: error.message, messay: "internal server error" });
    
    }

}

const deleteProduct=async(req,res)=>{
    try {
        const product=await productModel.findByIdAndDelete(req.params.pid);
        if(!product){
            return res.status(400).send({success:false,message:"product not found"});
        }
        res.status(200).send({success:true,message:"product deleted successfully",product});
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, error: error.message, messay: "internal server error" });
    }
}

const updateProduct=async(req,res)=>{
    try {
        const {name,price,description,quantity,category,shipping}=req.fields;
        const {photo}=req.files;
        if(!name||!price||!description||!quantity||!category||!shipping){
            return res.status(400).send({success:false,error:"all fields are required"});
        }
        if(photo && photo.size>1000000){
            return res.status(400).send({success:false,error:"file should be less than 1mb"});
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug:slugify(name)},{new:true});

        if (!product) {
            return res.status(404).send({ success: false, error: "Product not found" });
        }
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
          }
        await product.save();
        res.status(201).send({success:true,message:"product updated successfully",product});
    
        } catch (error) {
            console.log(error);
            res.status(400).send({ success: false, error: error.message, message: "internal server error" });
        }
}

const productControllers={
    createProduct,
    getAllProducts,
    getSingleProduct,
    getPhoto,
    deleteProduct,
    updateProduct

}

module.exports=productControllers;