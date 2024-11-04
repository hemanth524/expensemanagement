import React, { useEffect } from 'react';
import { Form, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();

    const submithandler = async (values) => {
        try {
            await axios.post('/api/v1/users/signup', values);
            message.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            message.error(error.response?.data?.message || "Signup failed");
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className='signup-page '>
            <div className='image-container '>
                <img
                    src="https://www.prismetric.com/wp-content/uploads/2023/04/cost-of-developing-an-expense-tracking-app.jpg"
                    alt="template"
                />
            </div>
            <div className='form-container'>
                <Form layout='vertical' onFinish={submithandler}>
                    <h1>Signup Page</h1>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type='password' />
                    </Form.Item>
                    <div className='d-flex justify-content-between'>
                        <Link to='/login'>Already an existing user? Login</Link>
                        <button className='btn btn-primary'>Signup</button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
