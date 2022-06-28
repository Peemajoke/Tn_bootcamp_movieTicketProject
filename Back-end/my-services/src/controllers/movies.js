import movieModel from '../models/movies'
import {
  NOT_FOUND_DATA, ERROR_UPDATED,
} from '../constants/errors/unsuccess'

const getAllMovies = async (req, res) => {
  try {
    const result = await movieModel.find()
    // setTimeout(() => {
    console.log(result)
    res.status(200).json(result)
    // }, 2000)
    if (!result) {
      res.status(404).json({ httpCode: '404', Message: 'Sorry, there is not a single movie.' })
    }
  } catch (err) {
    throw NOT_FOUND_DATA
  }
}

const getMovieById = async (req, res) => {
  const { ID } = req.params
  try {
    const result = await movieModel.findOne({ movie_id: ID })
    if (!result) {
      res.status(404).json({ httpCode: '404', Message: 'Sorry, there is no movie you were looking for.' })
    }
    res.status(200).json(result)
  } catch (err) {
    throw NOT_FOUND_DATA
  }
}

const updateMovieById = async (req, res) => {
  const { ID } = req.params
  try {
    const result = await movieModel.findOneAndUpdate({ id: ID }, req.body)
    if (!result) {
      throw NOT_FOUND_DATA
    }
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    throw ERROR_UPDATED
  }
}

export default {
  getAllMovies,
  getMovieById,
  updateMovieById,
}
