const maraiadb = require("mysql2")
const db = maraiadb.createPool({
  host: process.env.DB_HOST || "bk88grkwbdul5pr44zeo-mysql.services.clever-cloud.com",
  database: process.env.DB_NAME || "bk88grkwbdul5pr44zeo",
  user: process.env.DB_USER || "upmy7d62u34ylxcq",
  password: process.env.DB_PASSWORD || "ePcdXKC6brdncUB6pRKG",
  

})
module.exports = db 