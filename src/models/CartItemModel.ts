import { DataTypes, Sequelize } from "sequelize";
import questionPro from "../config/db";
import { CART_ITEMS } from "../config/tables";

const CartItems = questionPro.define(
  "cart_items",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    grocery_item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creation_date: {
      type: DataTypes.INTEGER,
      defaultValue: Sequelize.literal("UNIX_TIMESTAMP()"),
    },
    modified_date: {
      type: DataTypes.INTEGER,
      defaultValue: Sequelize.literal("UNIX_TIMESTAMP()"),
    },
  },
  {
    tableName: CART_ITEMS,
  }
);

export default CartItems;
