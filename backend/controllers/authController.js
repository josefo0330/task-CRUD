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

exports.register = (req, res) => {
  
  const { nombre, email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son obligatorios" })
  }
    console.log(nombre, email, password)
  const checkSql = "SELECT * FROM users WHERE email = ?"
  db.query(checkSql, [email], (checkErr, users) => {
    if (checkErr) return res.status(500).json(checkErr)

    if (users.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" })
    }
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)"
    console.log("Hola")  
    db.query(sql, [nombre,email,password,"user"], (insertErr, result) => {
      if (insertErr) return res.status(500).json(insertErr)

      return res.status(201).json({ message: "Usuario registrado correctamente" })
    })

  })
}