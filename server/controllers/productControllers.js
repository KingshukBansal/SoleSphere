
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel")
const orderModel =require("../models/orderModel")
const fs=require('fs');
const slugify = require("slugify");
const braintree=require("braintree");
const dotenv = require("dotenv");
dotenv.config();
const createProduct = async (req, res) => {
    try {
    const {name,price,description,quantity,category,shipping,availableSizes}=req.fields;
    const {photo}=req.files;
    if(!name||!price||!description||!quantity||!category||!shipping||!photo||!availableSizes){
        return res.status(400).send({success:false,error:"all fields are required"});
    }
    if(photo && photo.size>1000000){
        return res.status(400).send({success:false,error:"file should be less than 1mn"});
    }
    if(req.fields.availableSizes){ req.fields.availableSizes=JSON.parse(req.fields.availableSizes)}
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
        const products=await productModel.find({}).populate('category').select('-photo').limit(25).sort({createdAt:-1});
        res.status(200).send({success:true,message:"all products get fetched",products});
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, error: error.message, messay: "internal server error" });
    }
}
const getSingleProduct=async(req,res)=>{
    try {
        const product=await productModel.findById(req.params.pid).select('-photo').populate('category');
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
const filterProduct = async (req, res) => {
    try {
        const { categories, price, brands, sizes, discount } = req.body;
        productsPerPage=8;
        const page=req.params.page!=1?req.params.page:2;
        let args = {};
        if (categories.length) {
            args.category={$in:categories};
        }
        if(brands.length){
            args.brand={$in:brands};
        }
        if(discount.length){
            args.discount={$gte: discount[0],$lte:discount[1]}
        }
        if(sizes.length){
            args.availableSizes={$in:sizes};
        }


        

        
        if (price.length) args.price = { $gte: price[0], $lte: price[1] };
       const products = await productModel.find(args).skip((page-1)*productsPerPage).limit(productsPerPage).populate('category').select('-photo').sort({createdAt:-1});
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error: error.message,
            message: "Products can't be filtered",
        });
    }
};

const totalProductCount = async(req,res)=>{
    try {
        const totalProduct = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            totalProduct
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error: error.message,
            message: "Product can't be counted",
        });
    }
};
const getProductList = async(req,res)=> {
    try {
        productsPerPage=8;
        const page = req.params.page?req.params.page:1;
        const products  = await productModel.find({}).select('-photo').skip((page-1)*productsPerPage).limit(productsPerPage).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error: error.message,
            message: "Product can't be listed",
        });
    }
}

const searchProduct = async(req,res)=>{
    try {
   const {keyword} = req.params;
   const result = await productModel.find({
    $or: [
        {name:{$regex: keyword, $options:'i'}},
        {description:{$regex: keyword, $options:'i'}}
    ]
   }).select('-photo');
   res.status(200).send({
    success:true,
    message:'products successfully fetched',
    result
   })
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error:error.message,
            message:'Internal server error'
        })
    }
}

const productRecommendation = async(req,res)=>{
    try {
        console.log("productrecommendation");
        const {pid,cid} = req.params;

        const products = await productModel.find({
           category:cid,
           _id:{$ne:pid}
        }).limit(3).select('-photo').populate('category');

        res.status(200).send({
            success:true,
            message:"products succefully fetched",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error:error.message,
            message:"internal server error"
        })
    }
}

const getProductFromCategory = async(req,res)=>{
    try {
        const slug = req.params.slug;
        const category = await categoryModel.findOne({slug:slug});
        const products = await productModel.find({category:category._id}).select('-photo').populate('category');
        res.status(200).send({
            success:true,
            message:"Products fetched successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error:error.message,
            message:"internal server error"
        })
    }
}


//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

const brainTreeTokenGenerator = async(req,res)=>{
try {
    gateway.clientToken.generate({},function(err,response){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(response);
        }
    })
    
} catch (error) {
    console.log(error);
}
}
const brainTreePayment =async(req,res)=>{
try {
    const {cart,nonce} = req.body;
    let total=0;
    cart.map((i)=>{
        total+=i.price;
    })
    let newTransaction =gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).send({message:"internal server error"})
            return;
          }
          console.log(req.user);
          if (result.success) {
            const Order = new orderModel({
                products:cart,
                buyer:req.user.id,
                payment:result
            }).save();
            res.status(200).send({ok:true});
          } else {
            console.error(result.message);
            res.status(500).send({message:result.message})
          }
        }
      );
} catch (error) {
    console.log(error);
    res.status(400).send({message:"Internal server error"});
}
}

const getOrderController = async(req,res)=>{
try {
    const orders = await orderModel.find({buyer:req.user.id}).populate('products','-photo').populate('buyer','name');
    console.log(orders);
    res.status(200).send({success:true,orders});
    
} catch (error) {
    console.error(error);
    res.status(400).send({message:"orders error"})
}
}
const productControllers={
    createProduct,
    getAllProducts,
    getSingleProduct,
    getPhoto,
    deleteProduct,
    updateProduct,
    filterProduct,
    totalProductCount,
    getProductList,
    searchProduct,
    productRecommendation,
    getProductFromCategory,
    brainTreePayment,
    brainTreeTokenGenerator,
    getOrderController
}

module.exports=productControllers;