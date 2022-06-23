import authService from '../services/authService'

const getMe = async ()  => {
    try {
      const response = await authService.getMe()
      return {data: response}
    } catch (error) {
      console.log(error)
      console.log("error")
    }
  }
  
  const logout = async () => {
    try {
      const response = await authService.logout()
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  
  const register = async (registerData) => {
    try {
      const response = await authService.register(registerData)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (loginData) => {
    try {
      const response = await authService.login(loginData)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  export default {
    getMe,
    logout,
    register,
    login,
  }