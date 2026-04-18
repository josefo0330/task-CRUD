const maraiadb = require("mysql")
const db = maraiadb.createPool({
  host:  "localhost",
  user:  "root",
  password:  "",
  database: "tareas"
})
module.exports = db