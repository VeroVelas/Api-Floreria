require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuración de Sequelize
const sequelize = new Sequelize(
'florista_db',  // Nombre de la base de datos
  'root',         // Usuario
  '',             // Contraseña (vacía según tu configuración)
  {
    host: '127.0.0.1',  // Host de la base de datos
    port: 3306,         // Puerto de la base de datos
    dialect: 'mysql',   // Dialecto de la base de datos
  }
);


// Probar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a MySQL establecida correctamente.');
    return sequelize.query('SELECT * FROM Products'); // Ejecuta una consulta simple
  })
  .then(([results, metadata]) => {
    console.log('Datos de Products:', results);
  })
  .catch(err => {
    console.error('Error:', err);
  });
