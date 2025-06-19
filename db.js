const sql = require('mssql');
require('dotenv').config();


const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, 
    trustServerCertificate: false,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Połączono z Azure SQL');
    return pool;
  })
  .catch(err => console.error('Błąd połączenia z bazą:', err));

module.exports = {
  sql, poolPromise
};