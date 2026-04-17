import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../services/api"
import '../assets/creatTask.css'
import { AuthContext } from "../context/AuthContext";
export default function CreateTask() {
const [title, setTitle] = useState({})
const [descripcion, setDescripcion] = useState ({})
const { user } = useContext(AuthContext)
const navigate = useNavigate()
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("USER:", user)
  await api.post('/create', {title, descripcion, userID: user?.id})
  navigate('/dashboard')
}
  return (
    <div className="contendor">
      <form onSubmit={handleSubmit}>
        <h1>Agregar Tarea</h1>

        <div className="formulario">
            <label htmlFor="">Titulo</label>
            <input type="text" 
            onChange={e => setTitle(e.target.value)}
            />
        </div>
        <div className="formulario">
            <label htmlFor="">Descripcion</label>
            <input type="text"
            onChange={e => setDescripcion(e.target.value)}
            />
        </div>
        <button >Enviar</button>
      </form>
    </div>
  )
}
