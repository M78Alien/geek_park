import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 10000
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

http.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.dir(error)
  if (error.response.status === 401) {
    removeToken()
    router.navigate('/login')
    window.location.reload()
  }
  return Promise.reject(error)
})

export { http }