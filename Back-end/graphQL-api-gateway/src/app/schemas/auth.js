import authController from '../controllers/authController'

const typeDefs = `
  
  type User { 
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
  }

  type RegisterAndLogoutPayload {
    success: Boolean
  }

  type LoginPayload {
    success: Boolean
    token: String
  }

  type GetMePayload{
    data: User
  }

  input RegisterInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
  }

  input LoginInput{
    email: String!
    password: String!
  }

`
const queries = `
  getMe: GetMePayload
  logout: RegisterAndLogoutPayload
`

const mutations = `
  register(input: RegisterInput!): RegisterAndLogoutPayload
  login(input: LoginInput): LoginPayload
`

const resolvers = {
    Query: {
        getMe: (_, args) => authController.getMe(),
        logout: (_, args) => authController.logout(),
    },
    Mutation : {
        register: (_, args) => authController.register(args.input),
        login: (_,args) => authController.login(args.input),
    },
  }

export default {
  typeDefs,
  queries,
  mutations,
  resolvers,
}