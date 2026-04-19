import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../services/api"
import '../assets/creatTask.css'
import { AuthContext } from "../context/AuthContext";
export default function CreateTask() {
const [title, setTitle] = useState("")
const [descripcion, setDescripcion] = useState("")
const { user } = useContext(AuthContext)
const navigate = useNavigate()
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user?.id) {
    alert('No se encontró el usuario. Por favor inicia sesión nuevamente.')
    return
  }

  try {
    await api.post('/create', { title, descripcion, userID: user.id })
    navigate('/dashboard')
  } catch (err) {
    console.error('Error creating task:', err)
    alert('Error al crear la tarea. Revisa la consola para más detalles.'+title+", "+descripcion+", userID: "+user.id)
  }
}
  return (
    <div className="contendor">
      <form onSubmit={handleSubmit}>
        <h1>Agregar Tarea</h1>

        <div className="formulario">
            <label htmlFor="title">Titulo</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
        </div>
        <div className="formulario">
            <label htmlFor="descripcion">Descripcion</label>
            <input
              id="descripcion"
              type="text"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
        </div>
        <button >Enviar</button>
      </form>
    </div>
  )
}
