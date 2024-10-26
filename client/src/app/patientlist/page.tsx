'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const router = useRouter()
  // 获取病人数据
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatients();
  }, []);
  const handleEdit = (id) => {
     router.push(`/EditPatient?id=${id}`);
  };
  return (
    <div className="patient-list">
      <h2>Patient List</h2>
      {patients.length === 0 ? (
        <p>No patient data available.</p>
      ) : (
        <table>
          <thead>
          <tr>
            <th>Patient ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Gender</th>
            <th>edit</th>
          </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.patient_id}</td>
                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.DOB}</td>
                  <td>{patient.address}</td>
                  <td>{patient.gender}</td>
                  <td>
                    <Link href={`/EditPatient?id=${patient.id}`}>
                      <button>编辑</button>
                    </Link>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;
