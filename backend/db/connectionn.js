const maraiadb = require("mysql2")
const db = maraiadb.createPool({
  host: process.env.DB_HOST || "maria_db_app",
  database: process.env.DB_NAME || "tareas",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "qwert",
  

})
module.exports = db 