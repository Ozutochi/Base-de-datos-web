const mysql = require('mysql2/promise');

async function seedTestData() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'escuela_futbol_db',
    });

    console.log('--- Insertando Roles ---');
    await connection.query(`INSERT IGNORE INTO rol (id, nombre_rol, descripcion, estado) VALUES 
      (1, 'Representante', 'Padres y representantes de alumnos', 'Activo'),
      (2, 'Entrenador', 'Personal docente y deportivo de la academia', 'Activo'),
      (3, 'Administrador', 'Administrador del sistema', 'Activo')
    `);

    console.log('--- Insertando Usuarios de Prueba ---');
    // Admin
    await connection.query(`INSERT IGNORE INTO usuario (id, rol_id, nombre, apellido, cedula, correo, telefono, password_hash, estado) VALUES 
      (1, 3, 'Admin', 'Sistema', 'V-10000001', 'admin@academia.pro', '04141234567', '123456', 'Activo'),
      (2, 1, 'Juan', 'Pérez', 'V-20000002', 'representante@academia.pro', '04247654321', '123456', 'Activo')
    `);

    console.log('--- Insertando Categorías de Prueba ---');
    await connection.query(`INSERT IGNORE INTO categoria (id, nombre, tipo_modalidad, edad_minima, edad_maxima, estado) VALUES 
      (1, 'Sub-8', 'Fútbol Base', 6, 8, 'Activo'),
      (2, 'Sub-10', 'Fútbol Base', 9, 10, 'Activo'),
      (3, 'Sub-12', 'Fútbol Infantil', 11, 12, 'Activo'),
      (4, 'Sub-15', 'Fútbol Juvenil', 13, 15, 'Activo')
    `);

    console.log('¡Datos de prueba insertados con éxito en la base de datos!');
    await connection.end();
  } catch (error) {
    console.error('Error insertando datos de prueba:', error);
  }
}

seedTestData();
