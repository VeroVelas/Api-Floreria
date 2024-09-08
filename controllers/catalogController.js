// controllers/catalogController.js

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
  res.send('Lista de todos los productos');
};

// Obtener un producto por ID
exports.getProductById = (req, res) => {
  const productId = req.params.id;
  res.send(`Detalles del producto con ID: ${productId}`);
};

// Crear un nuevo producto
exports.createProduct = (req, res) => {
  const newProduct = req.body;  // Suponiendo que usas body-parser o middleware similar
  res.send(`Producto creado: ${JSON.stringify(newProduct)}`);
};

// Actualizar un producto existente
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;  // Suponiendo que usas body-parser o middleware similar
  res.send(`Producto con ID ${productId} actualizado a: ${JSON.stringify(updatedProduct)}`);
};

// Eliminar un producto
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  res.send(`Producto con ID ${productId} eliminado`);
};
