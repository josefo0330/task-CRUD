import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/authService"
import { AuthContext } from "../context/AuthContext"
import'../assets/login.css'

function LoginPage() {
 
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      const res = await login(form)

      // 🔥 guardas token + user
      setAuth(res.data.token, res.data.user)

      navigate("/dashboard")

    } catch (err) {
      console.log(err)
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="login-style">
    <form onSubmit={handleSubmit}>
      <h2>Inicio de Sesion</h2>

      <input className="text-form"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
      className="text-form"
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />
      <div className="button-container">
      <button type="submit" >Ingresar</button>
      </div>
    </form>
  </div>  
  )
}

export default LoginPage