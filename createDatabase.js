const sqlite3 = require('sqlite3').verbose();

// 打开数据库连接（若数据库不存在则会自动创建）
const db = new sqlite3.Database('./patientData.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// 创建 patients 表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT,
      DOB TEXT,
      address TEXT,
      gender TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "patients" created successfully.');
    }
  });
});

// 关闭数据库连接
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
