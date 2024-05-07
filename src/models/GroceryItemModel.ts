import { DataTypes, Sequelize } from "sequelize";
import questionPro from "../config/db";
import { GROCERY_ITEM } from "../config/tables";

const GroceryItem = questionPro.define(
  "grocery_item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE(10, 2),
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
    tableName: GROCERY_ITEM,
  }
);

export default GroceryItem;
