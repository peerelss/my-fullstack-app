'use client';
import React, { useState, useEffect } from 'react';
import './page.css';

const PatientForm = ({ patientObj }) => {
  const [formData, setFormData] = useState({
    patient_id: '',
    first_name: '',
    last_name: '',
    phone: '',
    DOB: '',
    address: '',
    gender: ''
  });

  // 初始化数据
  useEffect(() => {
    if (patientObj) {
      setFormData({
        patient_id: patientObj.patient_id || '',
        first_name: patientObj.first_name || '',
        last_name: patientObj.last_name || '',
        phone: patientObj.phone || '',
        DOB: patientObj.DOB || '',
        address: patientObj.address || '',
        gender: patientObj.gender || ''
      });
    }
  }, [patientObj]);

  // 处理表单更改
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交的数据:', formData);
    // 可以在这里调用 API 将 formData 提交给服务器
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>Patient Information</h2>
      <div className="form-group">
        <label>Patient ID:</label>
        <input type="text" name="patient_id" value={formData.patient_id} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>DOB:</label>
        <input type="text" name="DOB" value={formData.DOB} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
      </div>
      <div className="form-group">
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </form>
  );
};

export default PatientForm;
