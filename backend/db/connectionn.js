const maraiadb = require("mariadb")
const db = maraiadb.createPool({
  host: process.env.DB_HOST || "mariadb_db_app",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "qwert",
  database: process.env.DB_DATABASE || "tareas"
})
module.exports = db