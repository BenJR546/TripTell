const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "postgres",
      }
    );

module.exports = sequelize;

const { Pool } = require("pg");
const dbConfig = require("./config/connection");

const pool = new Pool(dbConfig);

pool.query("CREATE DATABASE travel_db", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Database created successfully");
  }
});

pool.end();
