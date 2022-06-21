// EXAMPLE
import RESPONSE_ERROR from '../constants/responseError'
import userModel from '../models/user'
import catchResponse from '../libs/catchResponse'

const getByID = async (req, res) => {
  const {
    id,
  } = req.params

  try {
    const data = await userModel.findOne({ id }).lean()
    if (!data) {
      throw RESPONSE_ERROR.GET_USER_BY_ID_NOT_FOUND
    }
    return res.status(200).json(data)
  } catch (error) {
    if (error.serviceCode) {
      return catchResponse(error)
    }
    return catchResponse({
      ...RESPONSE_ERROR.GET_USER_BY_ID_ERROR,
      error,
    })
  }
}

const create = async (req, res) => {
  const {
    id,
    resumeCode,
    emails,
  } = req.body

  try {
    const data = await userModel.create({ id, resumeCode, emails })
    return res.status(201).json(data)
  } catch (error) {
    return catchResponse({
      ...RESPONSE_ERROR.CREATE_USER_ERROR,
      error,
      payload: {
        id,
      },
    })
  }
}

export default {
  getByID,
  create,
}
