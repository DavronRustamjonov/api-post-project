import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios({
        url: 'https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          phone_number: values.phone,
          password: values.password,
        },
      });

      if (response.data.success) {
        localStorage.setItem('token', response?.data?.data?.tokens?.accessToken?.token);
        message.success("Maqtov yorliq olib chiqilar !!!");
        form.resetFields();
        navigate("/home");
      } else {
        message.error("Login or password is wrong!!!!!!!!!!");
      }
    } catch (error) {
      message.error("Login or password is wrong!!!!!!!!!!");
    }
  };

  return (
    <div style={styles.container}>
      <Form 
        form={form} 
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit" style={styles.button}>
            Submit
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
