import blogService from '../services/blogService'

const getBlogList = async (page, limit)  => {
  try {
    const response = await blogService.getBlogList(page, limit)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getBlogByID = async (id) => {
  try {
    const response = await blogService.getBlogByID(id)
    return response
  } catch (error) {
    console.log(error)
  }
}

const createBlog = async (blogData) => {
  try {
    const response = await blogService.createBlog(blogData)
    return {
      data: response.data
    }
  } catch (error) {
    console.log(error)
  }
}

const updateBlog = async (id, blogData) => {
  try {
    const response = await blogService.updateBlog(id, blogData)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const deleteBlog = async (id) => {
  try {
    const response = await blogService.deleteBlog(id)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getCategoryList = async () => {
  try {
    const response = await blogService.getCategoryList()
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getCategoryByENUM= async (category) => {
  try {
    const response = await blogService.getCategoryByENUM(category)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default {
  getBlogList,
  getBlogByID,
  createBlog,
  updateBlog,
  deleteBlog,
  getCategoryList,
  getCategoryByENUM
}