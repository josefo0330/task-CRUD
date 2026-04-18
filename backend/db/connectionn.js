const maraiadb = require("mariadb")
const db = maraiadb.createPool({
  host:  "maria_db_app",
  user: process.env.DB_USER || "root",
  password:  "qwert",
  database: "tareas"
})
module.exports = db