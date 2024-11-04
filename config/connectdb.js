const mongoose =require("mongoose");

const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("database connection succesful");
    }
    catch(err){
        console.log(`${err}`)
    }
}
module.exports=connectdb;