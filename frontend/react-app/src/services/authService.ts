import api from "./api"

export const login = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data)
}

export const register = (data: { nombre: string; email: string; password: string }) => {
  return api.post("/auth/register", data)
}