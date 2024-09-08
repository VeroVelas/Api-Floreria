// models/order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

const Order = sequelize.define('Order', {
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Relación entre pedidos y productos
Order.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(Order, { foreignKey: 'product_id' });

module.exports = Order;
