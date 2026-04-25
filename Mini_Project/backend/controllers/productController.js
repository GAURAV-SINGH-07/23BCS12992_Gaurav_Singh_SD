
const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 20, sort } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { brand: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (category) {
      where.category_id = category;
    }

    let order = [['created_at', 'DESC']];
    if (sort === 'price_asc') order = [['price', 'ASC']];
    else if (sort === 'price_desc') order = [['price', 'DESC']];
    else if (sort === 'rating') order = [['rating', 'DESC']];
    else if (sort === 'newest') order = [['created_at', 'DESC']];

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { rows: products, count } = await Product.findAndCountAll({
      where,
      include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
      limit: parseInt(limit),
      offset,
      order,
    });

    res.json({
      products,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      totalProducts: count,
    });
  } catch (error) {
    console.error('getAllProducts error:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('getProductById error:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/categories
exports.getCategories = async (_req, res) => {
  try {
    const categories = await Category.findAll({ order: [['name', 'ASC']] });
    res.json(categories);
  } catch (error) {
    console.error('getCategories error:', error);
    res.status(500).json({ error: error.message });
  }
};