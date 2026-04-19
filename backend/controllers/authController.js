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

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios" })
  }

  console.log("Register request:", { nombre, email })

  const checkSql = "SELECT * FROM users WHERE email = ?"
  db.query(checkSql, [email], (checkErr, users) => {
    if (checkErr) {
      console.error("Register check error:", checkErr)
      return res.status(500).json({ message: "Error al verificar el usuario", error: checkErr.code || checkErr.sqlMessage })
    }

    if (users.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" })
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    db.query(sql, [nombre, email, password], (insertErr, result) => {
      if (insertErr) {
        console.error("Register insert error:", insertErr)

        if (insertErr.code === "ER_BAD_FIELD_ERROR") {
          const fallbackSql = "INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)"
          return db.query(fallbackSql, [nombre, email, password], (fallbackErr, fallbackResult) => {
            if (fallbackErr) {
              console.error("Register fallback insert error:", fallbackErr)
              return res.status(500).json({ message: "Error al registrar el usuario", error: fallbackErr.code || fallbackErr.sqlMessage })
            }
            return res.status(201).json({ message: "Usuario registrado correctamente" })
          })
        }

        return res.status(500).json({ message: "Error al registrar el usuario", error: insertErr.code || insertErr.sqlMessage })
      }

      return res.status(201).json({ message: "Usuario registrado correctamente" })
    })
  })
}