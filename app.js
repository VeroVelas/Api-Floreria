// app.js
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const catalogRoutes = require('./routes/catalogoRoutes');
const orderRoutes = require('./routes/orderRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Florista',
      version: '1.0.0',
      description: 'API para manejo de catálogo y pedidos',
    },
    servers: [{ url: 'http://localhost:3001/api' }],
  },
  apis: ['./routes/*.js'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', catalogRoutes);
app.use('/api', orderRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Sincronización con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(3001, () => {
      console.log('Servidor escuchando en http://localhost:3001');
    });
  })
