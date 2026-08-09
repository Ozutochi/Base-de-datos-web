const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'escuela_futbol_db'
  });

  try {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    await connection.query('TRUNCATE TABLE categoria;');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('Tabla categoria vaciada con éxito.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await connection.end();
  }
}

main();
