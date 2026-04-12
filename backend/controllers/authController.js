const db = require("../db/connectionn")

exports.login = (req, res) => {

  const { email, password } = req.body

  const sql = "SELECT * FROM users WHERE email = ?"

  db.query(sql, [email], (err, data) => {

    if (err) return res.status(500).json(err)

    if (data.length === 0) {
      return res.status(401).json({ message: "Usuario no existe" })
    }

    const user = data[0]

    // ⚠️ comparación simple (luego mejoramos con bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" })
    }

    // login exitoso
    return res.json({
      token: "fake-token",
      user: {
        id: user.id,
        email: user.email
      }
    })
  })
}