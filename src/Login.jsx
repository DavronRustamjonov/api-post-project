import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import React from 'react';
import LMS from '/lmss.svg';
import Logo from '/logolms.png';
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
    <div style={{ display: "flex", textAlign: "center", height: "100%" }} className='container'>
      <div style={{ width: "85%", alignItems: 'center', background: "rgb(29, 45, 91)", padding: "20px" }}>
        <img src={LMS} alt="lms study" style={{ width: "100%" }} />
      </div>
      <div className='login-right' style={{ width: "100%" }}>
        <p style={{
          color: "black", padding: "10px", fontFamily: "sans-serif", fontSize: "12px", width: "70%",
          textAlign: "center", margin: "0 auto", lineHeight: "1.3"
        }}>
          MUHAMMAD AL-XORAZMIY NOMIDAGI
          TOSHKENT AXBOROT TEXNOLOGIYALARI
          UNIVERSITETI
        </p>
        <span style={{ width: "100px", marginBottom: '20px' }}>
          <img src={Logo} alt="logo lms" />
        </span>
        <Form
          form={form}
          name="login"
          labelAlign="top" 
          style={styles.form}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={handleLogin}
        >
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
            style={styles.formItem} 
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={styles.formItem} 
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 0, span: 24 }} 
            style={styles.formItem} 
          >
            <Button type="primary" htmlType="submit" style={styles.button}>
              Kirish
            </Button>
          </Form.Item>
        </Form>
        <div>
          <p style={{fontFamily:"sans-serif",fontSize:"10px"}}>Mualliflik huquqi © 2021 Toshkent axborot texnologiyalari universiteti</p>
        </div>
      </div>
      
    </div>
  );
}

const styles = {
  form: {
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    margin: '0 auto',
  },
  button: {
    width: '100%',
    marginTop: "30px",
  },
  formItem: {
    marginBottom: '16px',
  }
};
