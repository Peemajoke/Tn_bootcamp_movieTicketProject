import movieController from '../controllers/movieController'
import movieService from '../services/movieService'
// import {DateTimeTypeDefinition} from 'graphql-scalars'
import {DateTimeResolver} from 'graphql-scalars'

const typeDefs = `
  scalar DateTime

  enum Genre {
    Documentary
    Action
    Horror
    Thriller
    Comedy
    Romance
    Cult
    Shonen
    Shojo
  }

  type Seat {
    row: Int
    col: Int
  }

  type Showtime {
    theater: Int!
    dateTime: DateTime
    reservedSeat: [Seat]!
  }

  type Movie { 
    _id: ID!
    movie_id: String!
    name: String!
    description: String!
    genre: Genre!
    length: Int!
    coverURL: String!
    showTime: [Showtime]!
  }

  type MovieListPayload {
    data: [Movie]
  }

  type MoviePayload {
    data: Movie
  }

  input UpdateMovieInput{
    movie_id: String
    name: String
    description: String
    genre: Genre
    length: Int
    coverURL: String
  }
`

const queries = `
  getAllMovie: MovieListPayload
  getMovieByID(_id: ID!): MoviePayload
`

const mutations = `
  updateMovie(_id: ID!, input: UpdateMovieInput!): MoviePayload
`
const resolvers = {
  DateTime: DateTimeResolver,

  Query: {
    getAllMovie: (_, args) => movieController.getMovieList(),
    getMovieByID: (_, args) => movieController.getMovieByID(args._id)
  },
  Mutation : {
    updateMovie: (_, args) => movieController.updateMovie(args._id, args.input),
  },
  Movie: {
    genre: async (data) => {
        console.log(data.showTime)
      const getGenre = await movieService.getGenreByENUM(data.genre)
      return getGenre?.data?.value
    },
  },
}


export default {
  typeDefs,
  queries,
  mutations,
  resolvers,
}
