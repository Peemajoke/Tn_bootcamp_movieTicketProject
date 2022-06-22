import request from '../lib/request'
import { URL_SERVICE } from '../config'

const getTheaterList = () => request.get(`${URL_SERVICE}/theaters`)
const getTheaterByID = (number) => request.get(`${URL_SERVICE}/theaters/${number}`)

export default {
  getTheaterList,
  getTheaterByID,
}