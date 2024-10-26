'use client'
import React, { useState } from 'react';
import axios from 'axios';
import './page.css';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patient_id: '',
    first_name: '',
    last_name: '',
    phone: '',
    DOB: '',
    address: '',
    gender: ''
  });

  // 处理输入更改
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/patients', formData);
      alert(response.data.message);
      setFormData({ patient_id: '', first_name: '', last_name: '', phone: '', DOB: '', address: '', gender: '' });
    } catch (error) {
      alert('Error saving patient data');
      console.error('Error:', error);
    }
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>Patient Information</h2>
      {Object.keys(formData).map((key) => (
        <div className="form-group" key={key}>
          <label>{key.replace('_', ' ').toUpperCase()}:</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="form-group">
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </form>
  );
};

export default PatientForm;
