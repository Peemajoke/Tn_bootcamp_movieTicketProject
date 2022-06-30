import jwt from 'jsonwebtoken'
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
  // console.log('header', req)
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

const getTicketByRefNumberForClient = async (req, res) => {
  const { RefNumber } = req.params
  const { token } = req.query
  try {
    const result = await ticketModel.findOne({ ref_num: RefNumber })
    // console.log('body', token)
    console.log('res', jwt.decode(token).email)
    console.log('fetch res email', result.email)
    console.log('fetch res', result)
    if (!result) {
      res.status(404).json({ httpCode: '404', Message: 'Sorry, there is no ticket you were looking for.' })
    }
    if (result.email !== jwt.decode(token).email) {
      res.status(404).json({ httpCode: '404', Message: "Sorry, you are not permit to view this ticket's detail." })
    }
    res.status(200).json(result)
  } catch (err) {
    throw NOT_FOUND_DATA
  }
}

const createTicket = async (req, res) => {
  try {
    console.log('here')
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
  getTicketByRefNumberForClient,
  createTicket,
}
