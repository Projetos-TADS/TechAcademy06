import { Options } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Options } = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "database",
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      decimalNumbers: true,
    },
  },
  test: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "database",
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      decimalNumbers: true,
    },
  },
};

export = config;
