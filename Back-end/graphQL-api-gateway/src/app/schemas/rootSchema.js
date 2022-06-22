import { gql } from 'apollo-server-express'
import { merge } from 'lodash'
import blog from './blog'
import movie from './movie'
import theater from './theater'
import ticket from './ticket'

const moduleTypeDefs = [
  // blog.typeDefs
  movie.typeDefs,
  theater.typeDefs,
  ticket.typeDefs
]

const moduleQueries = [
  // blog.queries
  movie.queries,
  theater.queries,
  ticket.queries
]

const moduleMutations = [
  // blog.mutations
  ticket.mutations
]


const typeDefs = gql`
  ${moduleTypeDefs.join('\n')}

  type Query {
    ${moduleQueries.join('\n')}
  }

  type Mutation {
    ${moduleMutations.join('\n')}
  }

  schema {
    query: Query,
    mutation: Mutation
  }
`
const resolvers = merge(
  // blog.resolvers
  movie.resolvers,
  theater.resolvers,
  ticket.resolvers
)

export {
  typeDefs,
  resolvers,
}
