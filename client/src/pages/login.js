import React ,{ useEffect,useState} from 'react'
import { Form,Input,message } from "antd"
import {json, Link,Navigate,useNavigate} from 'react-router-dom';
import axios from "axios"
import Password from 'antd/es/input/Password';



const Login = () => {
    const Navigate=useNavigate()

    const submithandler= async(values)=>{
        try{
          const {data} = await axios.post("/api/v1/users/login",values);
          console.log("Login response:", data);
            message.success("login  successfull");
            localStorage.setItem('user', JSON.stringify({ ...data.user,password:""}))

            Navigate('/')
        }
        catch(error){
            message.error(error.response?.data?.message || "Signup failed");
        }
    };
    useEffect(()=>{
        if(localStorage.getItem('user')){
            Navigate("/");
        }
    },[Navigate])
  return (
    <div className='signup-page'>
    <div className='image-container '>
    <img
        src="https://www.prismetric.com/wp-content/uploads/2023/04/cost-of-developing-an-expense-tracking-app.jpg"
        alt="template"
    />
</div>
    <div className='form-container'>
    <Form layout='vertical' onFinish={submithandler}>
        <h1>Login Page</h1>
        
        <Form.Item label="Email" name="email">
            <Input type='email'/>
        </Form.Item>
        <Form.Item label="Password" name="password">
            <Input type='password'/>
        </Form.Item>
        <div className='d-flex justify-content-between'>
            <Link to='/signup'>Not an existing user? Signup</Link>
            <button className='btn btn-primary'>Login</button>

        </div>
    </Form>
</div>
</div>
  )
}

export default Login
