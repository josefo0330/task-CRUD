const maraiadb = require("mysql")
const db = maraiadb.createPool({
  host:  "bk88grkwbdul5pr44zeo-mysql.services.clever-cloud.com",
  user:  "root",
  password:  "ePcdXKC6brupmy7d62u34ylxcqdncUB6pRKG",
  database: "bk88grkwbdul5pr44zeo",
  port: 3306
})
module.exports = db