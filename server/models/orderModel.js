const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        products:[
            {
                type:mongoose.ObjectId,
                ref:'Product'
            }

        ]
        ,
        buyer:{
            type:mongoose.ObjectId,
            ref:'users'
        },
        status:{
            type:String,
            default:"Not processed",
            enum:["Not processed","processing","Shipped","delivered","cancelled"]
        },
        payment:[]
        
    },{timestamps:true}
);

module.exports = mongoose.model('Order', orderSchema);