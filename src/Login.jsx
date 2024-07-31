import { Button, Form, Input, message } from 'antd'
import axios from 'axios';
import React , {useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [phone ,setPhone]=useState('');
  const [password ,setPassword]=useState('');
  const navigate =useNavigate()
  const Registratsiya=()=>{
    axios({
        url:'https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin',
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        data:{
            phone_number:phone,
            password:password
        }
    })
    .then(res => {
        if(res.data.success){
            localStorage.setItem('token',res?.data?.data?.tokens?.accessToken?.token)
            message.success(" Maqtov yorli olib chiqilar !!! ")
            navigate("/home")
        }
  }).catch(
    (error) => {
        message.error(" Login or Password is wrong !!!")
    })
}
    return (
    <div>
      <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
    onFinish={Registratsiya}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input onChange={(e)=>setPhone(e.target.value)} />
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
      <Input.Password  onChange={(e)=>setPassword(e.target.value)}/>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

