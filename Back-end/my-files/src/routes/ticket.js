import express from 'express'
import ticketController from '../controllers/ticket'
import validator from '../request'

const router = express.Router()

router
  .get('/', ticketController.getAllTickets)
  .get('/:RefNumber', ticketController.getTicketByRefNumber)
  .post('/', ticketController.createTicket)

export default router
