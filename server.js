// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors'); // 引入 cors
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// 中间件
app.use(bodyParser.json());
const db = new sqlite3.Database('./patientData.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});
app.get('/api/patients', (req, res) => {
  const sql = `SELECT * FROM patients`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({
        message: 'Success',
        data: rows
      });
    }
  });
});
// POST 接口：将病人数据存入数据库
app.post('/api/patients', (req, res) => {
  const { patient_id, first_name, last_name, phone, DOB, address, gender } = req.body;
  
  const sql = `INSERT INTO patients (patient_id, first_name, last_name, phone, DOB, address, gender) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [patient_id, first_name, last_name, phone, DOB, address, gender], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Patient added successfully', id: this.lastID });
    }
  });
});
// Sample route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
