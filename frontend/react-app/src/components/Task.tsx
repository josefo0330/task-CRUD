import { useContext, useEffect, useState} from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import '../assets/task.css'
import { AuthContext } from "../context/AuthContext"
import NavbarComponents from "../components/Navbar/NavbarComponents"
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
        
        axios.get(`http://localhost:8081/${user?.id}`)
        .then(res => setTask(res.data))
        .catch(err => console.log(err))
        
    },[])
    const handleDelete = async (id: number) =>{
        try{
            await axios.delete(`http://localhost:8081/task/${id}`)
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

      await axios.post(`http://localhost:8081/status/${id}`, {
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
                 <NavbarComponents />
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
                            task.map((data,i)=>(
                            <tr key={data.id} >
                                <td>{data.title}</td>
                                <td>{data.descripcion}</td>
                                <td>{data.estado}</td>
                                <td>
                                    <label className="switch">
                                    <input type="checkbox"
                                        onChange={(e)=> handleCheckboxChange(data.id, e)}
                                        checked= {data.estado=== "realizado"}
                                    />
                                    <span className="slider round"></span>
                                    </label>
                                </td>
                                <td>
                                    <button onClick={(e) => handleDelete(data.id)}> Eliminar </button>
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