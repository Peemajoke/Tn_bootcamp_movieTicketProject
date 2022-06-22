import theaterService from '../services/theaterService'

const getTheaterList = async ()  => {
  try {
    const response = await theaterService.getTheaterList()
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}

const getTheaterByID = async (number) => {
  try {
    const response = await theaterService.getTheaterByID(number)
    return response
  } catch (error) {
    console.log(error)
  }
}

export default {
  getTheaterList,
  getTheaterByID,
}