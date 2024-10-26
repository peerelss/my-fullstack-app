// knexfile.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './patientData.db'  // SQLite 数据库文件路径
    },
    useNullAsDefault: true  // SQLite 设置
  }
};
