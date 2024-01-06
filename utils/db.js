const mysql = require("mysql");
const util = require("util");
require("dotenv").config();
const log = require("./log");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4"
});

module.exports = async(query)=>{
  connection.query = util.promisify(connection.query);
  try{
    log.info(query);
    return await connection.query(query);
  }catch(error){
    log.error(error);
    return [];
  }
}