

const orderModel =require("../models/orderModel")

const dotenv = require("dotenv");
dotenv.config();

const getOrderController = async(req,res)=>{
try {
    const orders = await orderModel.find({buyer:req.user.id}).populate('products','-photo').populate('buyer','name');
    res.status(200).send({success:true,orders});
    
} catch (error) {
    console.error(error);
    res.status(400).send({message:"orders error"})
}
}

const getAllOrders =async(req,res)=>{
    try {
        const orders = await orderModel.find({}).populate('products','-photo').populate('buyer','name').sort(createdAt='-1');

        res.status(200).send({success:true,orders});
    } catch (error) {
        console.error(error);
        res.status(400).send({message:"orders error"})
    }
}
const changeOrderStatus = async(req,res)=>{
    try {
        const status = req.body;
        status.map(async(s)=>{
            await orderModel.findByIdAndUpdate(s.order_id,{status:s.status})
        })
        res.status(200).send({message:`order status updated Successfully`});
        
    } catch (error) {
        console.error(error);
        res.status(400).send({message:`can't change the status of the order with order id:${req.params.id}`})
    }
}
const orderControllers={

    getOrderController,
    getAllOrders,
    changeOrderStatus
}

module.exports=orderControllers;