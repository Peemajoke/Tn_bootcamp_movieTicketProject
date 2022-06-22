import request from '../lib/request'
import { URL_SERVICE } from '../config'

const getBlogList = (page, limit) => request.get(`${URL_SERVICE}/blog`, { page, limit })
const getBlogByID = (id) => request.get(`${URL_SERVICE}/blog/${id}`)
const createBlog = (blogData) => request.post(`${URL_SERVICE}/blog`, { ...blogData })
const updateBlog = (id, blogData) => request.put(`${URL_SERVICE}/blog/${id}`, { ...blogData })
const deleteBlog = (id) => request.remove(`${URL_SERVICE}/blog/${id}`)
const getCategoryList = () => request.get(`${URL_SERVICE}/category`)
const getCategoryByENUM = (category) => request.get(`${URL_SERVICE}/category/${category}`)

export default {
  getBlogList,
  getBlogByID,
  createBlog,
  updateBlog,
  deleteBlog,
  getCategoryList,
  getCategoryByENUM
}


