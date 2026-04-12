import { createContext, useState } from "react"

interface User {
  id: number
  email: string
}

interface AuthContextType {
  token: string | null
  user: User | null
  setAuth: (token: string, user: User) => void
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  setAuth: () => {}
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

  return (
    <AuthContext.Provider value={{ token, user, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}