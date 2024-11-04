const express = require("express");
const cors=require("cors");
const morgan=require("morgan");
const dotenv=require("dotenv");
const colors=require("colors");
const connectdb=require("./config/connectdb")
const baseurl=require('./routes/user')
const path=require('path')

dotenv.config();

connectdb();
const app=express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use('/api/v1/users',baseurl);

app.use('/api/v1/transactions',require("./routes/transactionroute"))

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})

app.get('/',(req,res)=>{
    res.send(`<h1>hello from server</h1>`)
    })

const port= process.env.PORT || 2457;
app.listen(port,()=>{
    console.log(`the server started at ${port}`);
})