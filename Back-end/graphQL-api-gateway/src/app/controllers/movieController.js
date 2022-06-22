import movieService from '../services/movieService'

const getMovieList = async ()  => {
  try {
    const response = await movieService.getMovieList()
    return response
  } catch (error) {
    console.log(error)
  }
}

const getMovieByID = async (id) => {
  try {
    const response = await movieService.getMovieByID(id)
    return response
  } catch (error) {
    console.log(error)
  }
}

export default {
  getMovieList,
  getMovieByID,
}