import axios from 'axios'

const get = (url, params = {}, headers = {}, config = {}) => axios.get(url, { params, headers, ...config })

const patch = (url, data = {}, config = {}) => axios.patch(url, data, config)

const post = (url, data = {}, headers = {}, config = {}) => axios.post(url, data, { headers, ...config })

const put = (url, data, config = {}) => axios.put(url, data, config)

const remove = (url, data = {}, config = {}) => axios.delete(url, { ...config, data })

export default {
  get,
  patch,
  post,
  put,
  remove,
}
