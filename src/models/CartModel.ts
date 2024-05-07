import { DataTypes, Sequelize } from "sequelize";
import questionPro from "../config/db";
import { CART } from "../config/tables";

const Cart = questionPro.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    order_amount: {
      type: DataTypes.DECIMAL(10, 2),
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
    tableName: CART,
  }
);

export default Cart;
