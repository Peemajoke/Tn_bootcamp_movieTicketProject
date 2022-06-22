import { gql } from 'apollo-server-express'
import { merge } from 'lodash'
import blog from './blog'
import movie from './movie'
import theater from './theater'

const moduleTypeDefs = [
  // blog.typeDefs
  movie.typeDefs,
  theater.typeDefs
]

const moduleQueries = [
  // blog.queries
  movie.queries,
  theater.queries
]

const moduleMutations = [
  // blog.mutations
  // movie.mutations
]


const typeDefs = gql`
  ${moduleTypeDefs.join('\n')}

  type Query {
    ${moduleQueries.join('\n')}
  }



  schema {
    query: Query,
    

    
  }
`
const resolvers = merge(
  // blog.resolvers
  movie.resolvers,
  theater.resolvers
)

export {
  typeDefs,
  resolvers,
}

// type Mutation {
//   ${moduleMutations.join('\n')}
// }

// mutation: Mutation