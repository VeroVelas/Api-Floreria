// controllers/orderController.js
const Order = require('../models/order');
const Joi = require('joi');

// Validación de pedidos
const orderSchema = Joi.object({
  customer_name: Joi.string().required(),
  customer_email: Joi.string().email().required(),
  total_price: Joi.number().required(),
  product_id: Joi.number().integer().required(),
  status: Joi.string().valid('pending', 'shipped', 'delivered').default('pending')
});

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
};

// Obtener todos los pedidos
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
};

// Obtener un pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pedido' });
  }
};

// Actualizar el estado de un pedido
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado del pedido' });
  }
};

// Eliminar un pedido
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    await order.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el pedido' });
  }
};
