const mongoose =require("mongoose");

const userschema=new mongoose.Schema({
    name:{
        type:"string",
        required:true,
    },
    email:{
        type:"string",
        required:true,
        unique:true,
    },
    password:{
        type:"string",
        required:true,
    }

},{timestamps:true});

const userModel=mongoose.model('users',userschema);
module.exports=userModel