import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    axios({
      url: 'https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone_number: phone,
        password: password,
      },
    })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('token', res?.data?.data?.tokens?.accessToken?.token);
          message.success("Maqtov yorliq olib chiqilar !!!");
          navigate("/home");
        }
      })
      .catch(error => {
        message.error("Login or password is wrong!!!!!!!!!!");
      });
  };

  return (
    <div style={styles.container}>
      <Form 
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={styles.form}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleLogin}
      >
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit" style={styles.button}  >
            Kirish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  form: {
    maxWidth: '400px', 
    width: '100%',
    border: '2px solid azure',  
    borderRadius:'10px',
    boxShadow: '0px 4px 12px 0px rgb(232, 226, 226)',
    padding: '20px'
  },
  button: {
    width: '100%',
  },
};



