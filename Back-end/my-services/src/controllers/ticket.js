import ticketModel from '../models/ticket'
import {
  NOT_FOUND_DATA, ERROR_CREATION, ERROR_DELETED, ERROR_UPDATED,
} from '../constants/errors/unsuccess'
import {
  SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED,
} from '../constants/success'

const getAllTickets = async (req, res) => {
  try {
    const result = await ticketModel.find()
    res.status(200).json(result)
    if (!result) {
      res.status(404).json({ httpCode: '404', Message: 'Sorry, there is not a single ticket.' })
    }
  } catch (err) {
    throw NOT_FOUND_DATA
  }
}

const getTicketByRefNumber = async (req, res) => {
  const { RefNumber } = req.params
  try {
    const result = await ticketModel.findOne({ ref_num: RefNumber })
    if (!result) {
      res.status(404).json({ httpCode: '404', Message: 'Sorry, there is no ticket you were looking for.' })
    }
    res.status(200).json(result)
  } catch (err) {
    throw NOT_FOUND_DATA
  }
}

const createTicket = async (req, res) => {
  try {
    const result = await ticketModel.create(req.body)
    console.log(result)
    res.status(201).json(result)
  } catch (error) {
    console.log("It's create error.")
    console.log(error)
    throw ERROR_CREATION
  }
}

export default {
  getAllTickets,
  getTicketByRefNumber,
  createTicket,
}
