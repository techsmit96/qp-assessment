import { DataTypes, Sequelize } from "sequelize";
import questionPro from "../config/db";
import { USER_MASTER } from "../config/tables";

const User = questionPro.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.TEXT,
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
    tableName: USER_MASTER,
  }
);

export default User;
