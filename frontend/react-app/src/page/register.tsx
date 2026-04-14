import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/authService"
import '../assets/login.css'

function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    try {
      await register({
        nombre: form.nombre,
        email: form.email,
        password: form.password
      })

      alert("Usuario registrado correctamente. Por favor inicia sesión.")
      navigate("/")
    } catch (err) {
      console.log(err)
      alert("Error al registrar el usuario. Verifica los datos e intenta de nuevo.")
    }
  }

  return (
    <div className="login-style">
      <form onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>

        <input
          className="text-form"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          className="text-form"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="text-form"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />

        <input
          className="text-form"
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <div className="button-container">
          <button type="submit">Registrarme</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
