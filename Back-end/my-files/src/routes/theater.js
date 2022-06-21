import express from 'express'
import theaterController from '../controllers/theater'
import validator from '../request'

const router = express.Router()

router
  .get('/', theaterController.getAllTheaters)
  .get('/:Number', theaterController.getMovieByNumber)

export default router
