const mongoose = require('mongoose');

//userSchema

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        reqquired:true,
        trim:true,

    },
    email:{
        type:String,
        reqquired:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        reqquired:true,
        trim:true,
    },
    role:{
        type:Number,
        default:0
    },
    phone:{
        type:String,
        default:""
    },
    answer:{
        type:String,
        required:true
    },
address:{
    type:String,
    default:""
}
},
{timestamps:true},

)
module.exports= mongoose.model('users',userSchema);