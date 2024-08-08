import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const Enter = () => {

    axios({
      url: 'https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        phone_number: phone,
        password: password
      }
    })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('token', res?.data?.data?.tokens?.accessToken?.token);
          message.success("Welcome!");
          navigate("/home");
        }
      })
      .catch(err => {
        message.error("Invalid username or password!");
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={styles.form}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={Enter}
        >
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit" style={styles.submitButton}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

// Custom styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  formContainer: {
    background: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  form: {
    maxWidth: '100%',
  },
  submitButton: {
    width: '100%',
  },
};

export default Login;
