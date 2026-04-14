import { createContext, useState } from "react"

interface User {
  id: number
  email: string
}

interface AuthContextType {
  token: string | null
  user: User | null
  setAuth: (token: string, user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  setAuth: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }: any) => {

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  )

  const setAuth = (token: string, user: User) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    setToken(token)
    setUser(user)
  }
  const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  setToken(null)
  setUser(null)
} 
  return (
    <AuthContext.Provider value={{ token, user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}