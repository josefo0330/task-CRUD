import { useContext, useEffect, useState} from "react"
import api from '../services/api'
import { Link } from "react-router-dom"
import '../assets/task.css'
import { AuthContext } from "../context/AuthContext"
interface TaskType{
    id:number,
    title:string,
    descripcion:string,
    estado:string
}
function Task (){
    const { user } = useContext(AuthContext)
    const [task,setTask] = useState<TaskType[]>([])
    useEffect(()=>{
        
        api.get(`/tasks/${user?.id}`)
        .then(res => setTask(res.data))
        .catch(err => console.log(err))
        
    },[])
    const handleDelete = async (id: number) =>{
        try{
            await api.delete(`/task/${id}`)
            setTask(prev => prev.filter(t => t.id !== id))
        }
        catch(err){
            console.log(err)

        }
    }
 const handleCheckboxChange = async (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const checked = e.target.checked

    try {

      await api.post(`/status/${id}`, {
        estado: checked ? "realizado" : "pendiente"
      })

      // Actualizar estado local
      setTask(prev =>
        prev.map(t =>
          t.id === id
            ? { ...t, estado: checked ? "realizado" : "pendiente" }
            : t
        )
      )

    } catch (err) {
      console.log(err)
    }
  }
    return(
        <div className="task">
            <div className="table">
                <Link to ="/create" >Agregar +</Link>
                <table>
                    <thead>
                        <tr>
                        <th>Titulo</th>
                        <th>Descripcion</th>
                        <th>estado</th>
                        <th>Realizado</th>
                        <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            task.map((data)=>(
                            <tr key={data.id} >
                                <td data-label="Titulo">{data.title}</td>
                                <td data-label="Descripcion">{data.descripcion}</td>
                                <td data-label="Estado">{data.estado}</td>
                                <td data-label="Realizado">
                                    <label className="switch">
                                    <input type="checkbox"
                                        onChange={(e)=> handleCheckboxChange(data.id, e)}
                                        checked= {data.estado=== "realizado"}
                                    />
                                    <span className="slider round"></span>
                                    </label>
                                </td>
                                <td data-label="Accion">
                                    <button onClick={() => handleDelete(data.id)}> Eliminar </button>
                                </td>
                            </tr>
                            
                             ))
                        }
                        
                    </tbody>
                </table>
            </div>

        </div>

    )
}
export default Task