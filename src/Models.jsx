import { message } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Models = () => {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState('');
  const [brandId, setBrandId] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/models');
        setModels(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands');
        setBrands(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchModels();
    fetchBrands();
  }, []);

  const handleAddModel = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('brand_id', brandId);

      const response = await axios.post('https://autoapi.dezinfeksiyatashkent.uz/api/models', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        message.success("Qo'shildi");
        setModels([...models, response.data.data]);
      }
    } catch (error) {
      message.error("Xatolik mavjud");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Models</h2>
      <form onSubmit={handleAddModel}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Model name"
          style={{ width: 200, height: 30, marginRight: 10 }}
        />
        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          style={{ width: 200, height: 30, marginRight: 10 }}
        >
          <option value="" disabled>
            Select brand
          </option>
          {brands.map((brand, index) => (
            <option key={index} value={brand.id}>
              {brand.title}
            </option>
          ))}
        </select>
        <button type="submit" style={{ height: 30, width: 100 }}>
          Add
        </button>
      </form>
      <table style={{ marginTop: 20 }}>
        <thead>
          <tr style={{textAlign:"left"}}>
            <th>Model</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {models.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.brand_title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Models;