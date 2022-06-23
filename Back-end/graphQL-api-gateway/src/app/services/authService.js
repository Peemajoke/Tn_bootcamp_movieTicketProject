import request from '../lib/request'
import { URL_SERVICE } from '../config'

const getMe = () => request.get(`${URL_SERVICE}/auth/me`)
const logout = () => request.get(`${URL_SERVICE}/auth/logout`)
const register = (registerData) => request.post(`${URL_SERVICE}/auth/register`, { ...registerData })
const login = (loginData) => request.post(`${URL_SERVICE}/auth/login`, { ...loginData })

export default {
    getMe,
    logout,
    register,
    login,
}