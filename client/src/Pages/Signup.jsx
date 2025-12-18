import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom'

import axios from 'axios'
const onFinish = values => {
    console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const register = async () => {
        try {
            const res = await axios.post('http://localhost:5000/lms/signup', { name, email, password })
            setName('')
            setEmail('')
            setPassword('')
            setMessage(res.data.message)
            setTimeout(() => navigate('/login'), 2000)
            setMessage('')
        } catch (err) {
            console.error(err);
        }
    }




    return (
        <>
            {message && <p>{message}</p>}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button onClick={register}>
                        Submit
                    </Button>
                </Form.Item>
            </Form >
        </>
    )
};
export default Signup;
