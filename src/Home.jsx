import { Button, Form, Input, Modal, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';

function Home() {
  // Modal holati
  const [open, setOpen] = useState(false);
  const showModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  // shunchaki  /home qo`shsak unga o`tib ketmasligi uchun kerak bo`lgan narsa . Ya`ni /home ga o`tish uchun phone va password qatiy talab qiluvchi narsa  
  const navigate=useNavigate()
  const token =localStorage.getItem('token')

  // Rasm holati
  const [image, setImage] = useState(null);

  // Form referensiyasi
  const formRef = useRef(null);

  // Formani yuborish funksiyasi
  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('text', values.text);
    formData.append('images', image);

    axios({
      url: 'https://autoapi.dezinfeksiyatashkent.uz/api/cities',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data' 
      },
      data: formData
    })
    .then(response => {
      if (response.data.success) {
        message.success("Qo'shildi");
        setOpen(false);
        getCities();
        formRef.current.resetFields(); // Formani tozalash
      }
    })
    .catch(error => {
      console.error(error);
      message.error("Xatolik yuz berdi: " + (error.response?.data?.message || "Server bilan bog'lanishda xatolik"));
    });
  };

  // api  oid ma'lumotlar
  const [cities, setCities] = useState([]);
  const getCities = () => {
    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
      .then(response => setCities(response?.data?.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    if(!token){
      navigate('/')
    }
    getCities();
  }, []);

  // Jadval uchun kerak bu joyi 
  const columns = [
    {
      title: 'Images',
      dataIndex: 'images',
      render: image => <img width={150} src={image} alt="city" />
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Text',
      dataIndex: 'text',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: () => (
        <>
          <Button type='primary'>Edit </Button>
          <Button danger type='primary'>Delete </Button>
        </>
      )
    }
  ];

  const BaseUrl = 'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/';
  const data = cities.map((item, index) => ({
    key: item.id || index, // Yunik IDni ishlatish yaxshiroq
    number: index + 1,
    name: item.name,
    text: item.text,
    images: `${BaseUrl}${item.image_src}`, // Rasm URL-ni to'g'ri qo'shish
    actions: null // Harakatlar boshqa tarzda ko'rsatilishi mumkin
  }));

  return (
    <div>
      <div style={{ margin: "50px", textAlign: "right" }}>
        <Button type='primary' onClick={showModal}>Add</Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Modal title="City qo'shish" open={open} footer={null} onCancel={closeModal}>
        <Form
          ref={formRef}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item
            label="Text"
            name="text"
            rules={[{ required: true, message: 'Please input the text!' }]}
          >
            <Input placeholder='Text' />
          </Form.Item>
          <Form.Item
            label="Images"
            name="image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Input
              type='file'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Home;
