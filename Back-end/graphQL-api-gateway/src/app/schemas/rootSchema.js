import { gql } from 'apollo-server-express'
import { merge } from 'lodash'
import blog from './blog'

const moduleTypeDefs = [
  blog.typeDefs
]

const moduleQueries = [
  blog.queries
]

const moduleMutations = [
  blog.mutations
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
  blog.resolvers
)

export {
  typeDefs,
  resolvers,
}