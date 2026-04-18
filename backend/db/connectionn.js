const mysql = require("mysql")
const db = mysql.createPool({
  host: process.env.DB_HOST || "tareas-db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "qwert",
  database: process.env.DB_DATABASE || "tareas"
})
module.exports = db