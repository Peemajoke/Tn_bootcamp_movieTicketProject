import express from 'express'
// import studentController from './controllers/student'
import movieController from '../controllers/movies'
import validator from '../request'
// import {cacheWithRedis} from './connection/redis'

const router = express.Router()

// const onlyStatus200 = (req, res) => res.statusCode === 200

router
  .get('/', movieController.getAllMovies)
  .get('/:ID', validator.getOneMovie, movieController.getMovieById)
  .put('/:ID', validator.updateOneMovie, movieController.updateMovieById)

export default router
