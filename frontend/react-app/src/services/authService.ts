import api from "./api"

export const login = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data)
}