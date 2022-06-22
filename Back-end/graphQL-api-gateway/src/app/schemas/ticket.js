import ticketController from '../controllers/ticketController'
import {DateTimeResolver} from 'graphql-scalars'

const typeDefs = `

  type Ticket { 
    _id: ID!
    ref_num: String!
    email: String!
    movie: String!
    theater: Int!
    dateTime: DateTime!
    seat: String!
    price: Int!
  }

  type TicketListPayload {
    data: [Ticket]
  }

  type TicketPayload {
    data: Ticket
  }

  input CreateTicketInput {
    ref_num: String!
    email: String!
    movie: String!
    theater: Int!
    dateTime: DateTime!
    seat: String!
    price: Int!
  }
`

const queries = `
  getAllTicket: TicketListPayload
  getTicketByID(ref_num: String!): TicketPayload
`

const mutations = `
  createTicket(input: CreateTicketInput!): TicketPayload
`

const resolvers = {
    Query: {
        getAllTicket: (_, args) => ticketController.getTicketList(),
        getTicketByID: (_, args) => ticketController.getTicketByID(args.ref_num),
    },
    Mutation : {
        createTicket: (_, args) => ticketController.createTicket(args.input),
    },
  }

  export default {
    typeDefs,
    queries,
    mutations,
    resolvers,
  }
