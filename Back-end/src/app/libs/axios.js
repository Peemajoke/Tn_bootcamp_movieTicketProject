import axios from 'axios'

axios.interceptors.response.use((response) => response, (error) => {
  const response = error.response ? error.response : { status: 500, data: { error: error.message } }
  return Promise.reject(response)
})

export default axios
