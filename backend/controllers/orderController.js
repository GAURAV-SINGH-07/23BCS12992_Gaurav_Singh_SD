
const { Order, OrderItem, CartItem, Product } = require('../models');
const sequelize = require('../config/database');

const DEFAULT_USER_ID = 1;

// POST /api/orders
exports.placeOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip, shipping_phone } = req.body;

    // Validate shipping info
    if (!shipping_name || !shipping_address || !shipping_city || !shipping_state || !shipping_zip || !shipping_phone) {
      await t.rollback();
      return res.status(400).json({ error: 'All shipping fields are required' });
    }

    // Get cart items
    const cartItems = await CartItem.findAll({
      where: { user_id: DEFAULT_USER_ID },
      include: [{ model: Product, as: 'product' }],
      transaction: t,
    });

    if (cartItems.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total & verify stock
    let totalAmount = 0;
    for (const item of cartItems) {
      if (item.product.stock_quantity < item.quantity) {
        await t.rollback();
        return res.status(400).json({
          error: `Insufficient stock for ${item.product.name}. Available: ${item.product.stock_quantity}`,
        });
      }
      totalAmount += parseFloat(item.product.price) * item.quantity;
    }

    // Create order
    const order = await Order.create(
      {
        user_id: DEFAULT_USER_ID,
        total_amount: totalAmount.toFixed(2),
        status: 'confirmed',
        shipping_name,
        shipping_address,
        shipping_city,
        shipping_state,
        shipping_zip,
        shipping_phone,
      },
      { transaction: t }
    );

    // Create order items & reduce stock
    for (const item of cartItems) {
      await OrderItem.create(
        {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price_at_purchase: item.product.price,
        },
        { transaction: t }
      );

      await Product.update(
        { stock_quantity: item.product.stock_quantity - item.quantity },
        { where: { id: item.product_id }, transaction: t }
      );
    }

    // Clear cart
    await CartItem.destroy({ where: { user_id: DEFAULT_USER_ID }, transaction: t });

    await t.commit();

    // Fetch complete order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    res.status(201).json(completeOrder);
  } catch (error) {
    await t.rollback();
    console.error('placeOrder error:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: DEFAULT_USER_ID },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
      order: [['created_at', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    console.error('getOrders error:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, user_id: DEFAULT_USER_ID },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error('getOrderById error:', error);
    res.status(500).json({ error: error.message });
  }
};