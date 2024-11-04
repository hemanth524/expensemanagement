const express=require("express");
const {logincontroller,signupcontroller}=require('../controllers/user')

const router=express.Router();

router.post('/login',logincontroller);

router.post('/signup',signupcontroller);

module.exports=router