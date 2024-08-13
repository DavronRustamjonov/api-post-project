import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Models = () => {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState('');
  const [brandId, setBrandId] = useState('');
  const mytoken = localStorage.getItem('token');
  const getModels = () => {
    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/models')
      .then((res) => setModels(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const getBrands = () => {
    axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/brands')
      .then((res) => setBrands(res?.data?.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getModels();
    getBrands();
  }, []);

  const addModels = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand_id', brandId);
    axios({
      url: 'https://autoapi.dezinfeksiyatashkent.uz/api/models',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${mytoken}`,
      },
      data: formData,
    })
      .then((res) => {
        if (res?.data.success) {
          message.success("Qo'shildi");
          getModels();
        }
      })
      .catch((err) => {
        message.error("Xatolik mavjud");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Models</h2>
      <form onSubmit={addModels}>
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
          {brands &&
            brands.map((brand, index) => (
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
          <tr>
            <th>Model</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {models &&
            models.map((item, index) => (
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