import express from 'express'
// import studentController from './controllers/student'
import movieController from '../controllers/movies'
import validator from '../request'
// import {cacheWithRedis} from './connection/redis'

const router = express.Router()

// const onlyStatus200 = (req, res) => res.statusCode === 200

router
  // .get('/students', cacheWithRedis('5 minutes', onlyStatus200), studentController.getAllStudents)
  // .get('/students', studentController.getAllStudents)
  // .get('/students/:ID', validator.getById, studentController.getStudentById)
  // .post('/students', validator.create, studentController.createStudent)
  // .put('/students/:ID', validator.updateById, studentController.updateStudentById)
  // .delete('/students/:ID', validator.deleteById, studentController.deleteStudentById)
  // .get('/students/:ID/gpax', validator.getById, studentController.getGpaxOfStudentById)
  .get('/', movieController.getAllMovies)
  .get('/:ID', validator.getOneMovie, movieController.getMovieById)

export default router
