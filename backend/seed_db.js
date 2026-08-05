const mysql = require('mysql2/promise');

async function seedDb() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'escuela_futbol_db'
    });
    
    await connection.query(`INSERT IGNORE INTO rol (id, nombre_rol, descripcion) VALUES (2, 'Entrenador', 'Personal docente y deportivo de la academia')`);
    
    console.log('Rol Entrenador (ID=2) creado.');
    await connection.end();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDb();
