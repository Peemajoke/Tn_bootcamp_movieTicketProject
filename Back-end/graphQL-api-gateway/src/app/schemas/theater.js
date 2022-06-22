import theaterController from '../controllers/theaterController'

const typeDefs = `

  type Theater { 
    _id: ID!
    theaterNumber: Int
    allSeat: [Int]
  }

  type TheaterListPayload {
    data: [Theater]
  }

  type TheaterPayload {
    data: Theater
  }
`

const queries = `
  getAllTheater: TheaterListPayload
  getTheaterByID(theaterNumber: Int!): TheaterPayload
`

// const mutations = `
//   createBlog(input: CreateBlogInput!): BlogPayload
//   updateBlog(_id: ID!, input: CreateBlogInput!): ResponseUpdatingPayload
//   deleteBlog(_id: ID!): ResponseUpdatingPayload
// `
const resolvers = {

  Query: {
    getAllTheater: (_, args) => theaterController.getTheaterList(),
    getTheaterByID: (_, args) => theaterController.getTheaterByID(args.theaterNumber)
  },
//   Mutation : {
//     createBlog: (_, args) => blogController.createBlog(args.input),
//     updateBlog: (_, args) => blogController.updateBlog(args._id, args.input),
//     deleteBlog: (_, args) => blogController.deleteBlog(args._id)
//   },
}


export default {
  typeDefs,
  queries,
//   mutations,
  resolvers,
}