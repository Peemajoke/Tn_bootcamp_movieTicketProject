import blogController from '../controllers/blogController'
import blogService from '../services/blogService'

const typeDefs = `
  enum BlogCategories {
    ART
    BUSINESS
    HISTORY
    JOURNAL
    MATH
    REVIEW
    SPORT
  }

  type Blog { 
    _id: ID!
    title: String!
    category: BlogCategories
    categoryValue: String
    description: String
    createdAt: String
    updatedAt: String
  }

  type Page {
    limit: Int
    page: Int 
    total: Int 
  }

  type BlogListPayload {
    total: Int
    pagination: Page
    data: [Blog]
  }

  type BlogPayload {
    data: Blog
  }

  input CreateBlogInput {
    title: String!
    categories: [BlogCategories]
    description: String
  }

  type ResponseUpdatingPayload {
    httpCode: String
    message: String
  }

  type CategoryListPayload {
    ART: String
    BUSINESS: String
    HISTORY: String
    JOURNAL: String
    REVIEW: String
    SPORT: String
  }

  type CategoryPayload {
    value: String
  }
`

const queries = `
  getAllBlog(page: Int, limit: Int): BlogListPayload
  getBlogByID(_id: ID!): BlogPayload
  getCategoryList: CategoryListPayload
  getCategoryByENUM(category: BlogCategories): CategoryPayload
`

const mutations = `
  createBlog(input: CreateBlogInput!): BlogPayload
  updateBlog(_id: ID!, input: CreateBlogInput!): ResponseUpdatingPayload
  deleteBlog(_id: ID!): ResponseUpdatingPayload
`
const resolvers = {
  Query: {
    getAllBlog: (_, args) => blogController.getBlogList(args.page, args.limit),
    getBlogByID: (_, args) => blogController.getBlogByID(args._id),
    getCategoryList: (_, args) => blogController.getCategoryList(),
    getCategoryByENUM: (_, args) => blogController.getCategoryByENUM(args.category)
  },
  Mutation : {
    createBlog: (_, args) => blogController.createBlog(args.input),
    updateBlog: (_, args) => blogController.updateBlog(args._id, args.input),
    deleteBlog: (_, args) => blogController.deleteBlog(args._id)
  },
  Blog: {
    categoryValue: async (data) => {
      const getCategory = await blogService.getCategoryByENUM(data.category)
      return getCategory?.data?.value
    },
  },
}


export default {
  typeDefs,
  queries,
  mutations,
  resolvers,
}
