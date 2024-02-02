
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(

    {
        name:{
            type : String,
            required : true,

        },
        brand:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Brand',
            required:true
        },
        availableSizes:{
            type:Array,
            required:true
        },
        discount:{
            type:Number,
            required:true
        },
        slug:{
            type : String,
            required : true,
        },
        price:{
            type : Number,
            required : true,
        },
        quantity:{
            type : Number,
            required : true,
        },
        description:{
            type : String,
            required : true,
        },
        category:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category',
            required : true,
        },
        photo:{
            data:Buffer,
            contentType:String
        },
        shipping:{
            type:Boolean
                }

    },{timestamps:true}
);

module.exports = mongoose.model('Product',productSchema);