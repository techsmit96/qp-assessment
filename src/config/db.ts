import { Sequelize } from "sequelize";

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_DIALECT } = process.env;

const questionPro = new Sequelize( DB_NAME,DB_USER,DB_PASSWORD,{
  host: DB_HOST || 'localhost',
  port: 3307,
  dialect: 'mysql',
  logging: false,
  logQueryParameters: false,
  define: {
    timestamps: false,
  },
});

export default questionPro;
