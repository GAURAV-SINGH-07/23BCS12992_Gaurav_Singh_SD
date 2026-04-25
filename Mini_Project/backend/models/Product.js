
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define(
  'Product',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(500), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    original_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'categories', key: 'id' },
    },
    stock_quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    rating: { type: DataTypes.DECIMAL(2, 1), defaultValue: 0 },
    review_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    brand: { type: DataTypes.STRING, allowNull: true },
    images: { type: DataTypes.JSON, defaultValue: [] },
    specifications: { type: DataTypes.JSON, defaultValue: {} },
  },
  { tableName: 'products', timestamps: true, underscored: true }
);

module.exports = Product;