import request from '../lib/request'
import { URL_SERVICE } from '../config'

const getMovieList = () => request.get(`${URL_SERVICE}/movies`)
const getMovieByID = (id) => request.get(`${URL_SERVICE}/movies/${id}`)

const getGenreByENUM = (category) => {
    let data = {value: `${category}`}
    return { data }
  }

export default {
  getMovieList,
  getMovieByID,
  getGenreByENUM,
}