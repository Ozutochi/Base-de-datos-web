const mysql = require('mysql2/promise');

async function createDb() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });
    
    await connection.query('CREATE DATABASE IF NOT EXISTS escuela_futbol_db');
    console.log('Database created successfully!');
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

createDb();
