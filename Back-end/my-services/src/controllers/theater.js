import theaterModel from '../models/theater'
import {
  NOT_FOUND_DATA, ERROR_CREATION, ERROR_DELETED, ERROR_UPDATED,
} from '../constants/errors/unsuccess'
import {
  SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED,
} from '../constants/success'

const getAllTheaters = async (req, res) => {
  try {
    const result = await theaterModel.find()
    res.status(200).json(result)
    if (!result) {
      res.status(404).json({ httpCode: '404', Message: 'Sorry, there is not a single theater.' })
    }
  } catch (err) {
    throw NOT_FOUND_DATA
  }
}

const getMovieByNumber = async (req, res) => {
  const { Number } = req.params
  try {
    const result = await theaterModel.findOne({ theaterNumber: Number })
    if (!result) {
      res.status(404).json({ httpCode: '404', Message: 'Sorry, there is no theater you were looking for.' })
    }
    res.status(200).json(result)
  } catch (err) {
    throw NOT_FOUND_DATA
  }
}

export default {
  getAllTheaters,
  getMovieByNumber,
  // createStudent,
  // updateStudentById,
  // deleteStudentById,
  // getGpaxOfStudentById,
}
