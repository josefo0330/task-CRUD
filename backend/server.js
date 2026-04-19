const express = require ("express")
const app = express()
const cors= require("cors")
const db = require("./db/connectionn")
const authRoutes = require("./routes/authRoutes")
//rutas
app.use(cors())
app.use(express.json())

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

app.use("/auth", authRoutes)
app.get("/", (req, res) => {
  res.send("API funcionando 🚀")
})
//Mostrar las tareas en la tabla
app.get('/tasks/:userId', (req, res)=>{
  const userId = req.params.userId
  const sql = "SELECT * FROM task WHERE userID = ?"
  db.query(sql, [userId], (err, data) => {
    if (err) return res.json(err)
    res.json(data)
  })
})
// insertar los datos nuevos
app.post('/create',(req,res) =>{
    const { title, descripcion, userID } = req.body

    if (!title || !descripcion || !userID) {
      console.error('Create task validation failed:', { title, descripcion, userID })
      return res.status(400).json({ message: 'title, descripcion y userID son obligatorios' })
    }

    const sql = `
    INSERT INTO task (title, descripcion, estado, userID)
    VALUES (?, ?, ?, ?)
  `

    console.log('POST /create body:', { title, descripcion, userID })
    db.query(sql,[title, descripcion, "pendiente", userID],(err,data)=>{
        if (err) {
            console.error('Create task error:', err)
            return res.status(500).json({ message: 'Error al crear tarea', error: err.message })
        }
        return res.status(201).json({ message: 'Tarea creada', insertId: data.insertId })
    })
})
//eliminar las tareas 
app.delete('/task/:id',(req, res) =>{
    const sql = "DELETE FROM task where id = ? "
    const id = req.params.id
    db.query(sql,[id],(err,data)=>{
        if (err) return res.json("error")
        return res.json(data)
    })
})
//cambiar el estado de la tarea
app.post('/status/:id', (req, res) => {

    const id = req.params.id
    const { estado } = req.body

    const sql = "UPDATE task SET estado = ? WHERE id = ?"

    db.query(sql, [estado, id], (err, result) => {

        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Error al actualizar estado" })
        }

        return res.json({
            message: "Estado actualizado correctamente"
        })
    })
})
port=8081
app.listen(port, "0.0.0.0", ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
}) 
