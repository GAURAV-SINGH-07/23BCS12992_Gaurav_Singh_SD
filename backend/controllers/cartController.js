
const { CartItem, Product } = require('../models');

const DEFAULT_USER_ID = 1;

// GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.findAll({
      where: { user_id: DEFAULT_USER_ID },
      include: [{ model: Product, as: 'product' }],
      order: [['created_at', 'DESC']],
    });
    res.json(items);
  } catch (error) {
    console.error('getCart error:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    if (!product_id) return res.status(400).json({ error: 'product_id is required' });

    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    let cartItem = await CartItem.findOne({
      where: { user_id: DEFAULT_USER_ID, product_id },
    });

    if (cartItem) {
      cartItem.quantity += parseInt(quantity);
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        user_id: DEFAULT_USER_ID,
        product_id,
        quantity: parseInt(quantity),
      });
    }

    const fullItem = await CartItem.findByPk(cartItem.id, {
      include: [{ model: Product, as: 'product' }],
    });

    res.status(201).json(fullItem);
  } catch (error) {
    console.error('addToCart error:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/cart/:id
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findOne({
      where: { id: req.params.id, user_id: DEFAULT_USER_ID },
    });

    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });

    if (quantity < 1) return res.status(400).json({ error: 'Quantity must be at least 1' });

    cartItem.quantity = parseInt(quantity);
    await cartItem.save();

    const fullItem = await CartItem.findByPk(cartItem.id, {
      include: [{ model: Product, as: 'product' }],
    });

    res.json(fullItem);
  } catch (error) {
    console.error('updateCartItem error:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/cart/:id
exports.removeFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findOne({
      where: { id: req.params.id, user_id: DEFAULT_USER_ID },
    });
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });

    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
  console.error('removeFromCart error:', error);
  res.status(500).json({ error: error.message });
}
};

// DELETE /api/cart  (clear entire cart)
exports.clearCart = async (req, res) => {
try {
  await CartItem.destroy({ where: { user_id: DEFAULT_USER_ID } });
  res.json({ message: 'Cart cleared' });
} catch (error) {
  console.error('clearCart error:', error);
  res.status(500).json({ error: error.message });
}
};

// GET /api/cart/count
exports.getCartCount = async (req, res) => {
try {
  const items = await CartItem.findAll({ where: { user_id: DEFAULT_USER_ID } });
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  res.json({ count });
} catch (error) {
  console.error('getCartCount error:', error);
  res.status(500).json({ error: error.message });
}
};