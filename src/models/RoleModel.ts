import { DataTypes, Sequelize } from "sequelize";
import questionPro from "../config/db";
import { ROLE_MASTER } from "../config/tables";

const Roles = questionPro.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: ROLE_MASTER,
  }
);

export default Roles;
