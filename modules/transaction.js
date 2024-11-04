const mongoose =require('mongoose')

const transactionschema= new mongoose.Schema({

    userID:{
        type:String,
        required:true,
    },

    amount:{
        type:Number,
        required:[true,'amount is required']
    },
    type:{
        type:String,
        required:[true,"type of transaction is required"]

    },
    category:{
        type:String,
        required:[true,'category is required']
    },
    reference:{
        type:String,
        
    }, 
    description:{
        type:String,
       
    },
    date:{
        type:String,
        required:[true,'date is important']
    }

},{timestamps:true});

const transactionModel=mongoose.model('transactions',transactionschema)
module.exports=transactionModel;