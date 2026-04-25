
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define(
  'Order',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'confirmed',
    },
    shipping_name: { type: DataTypes.STRING, allowNull: false },
    shipping_address: { type: DataTypes.STRING, allowNull: false },
    shipping_city: { type: DataTypes.STRING, allowNull: false },
    shipping_state: { type: DataTypes.STRING, allowNull: false },
    shipping_zip: { type: DataTypes.STRING, allowNull: false },
    shipping_phone: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'orders', timestamps: true, underscored: true }
);

module.exports = Order;