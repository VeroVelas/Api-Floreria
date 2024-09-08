require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const { Sequelize } = require('sequelize');

// Conexión a la base de datos MySQL usando Sequelize
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

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a MySQL establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a MySQL:', err);
  });

module.exports = sequelize;
