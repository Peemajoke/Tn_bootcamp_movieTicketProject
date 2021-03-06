import express from 'express'
import ticketController from '../controllers/ticket'
import validator from '../request'

const router = express.Router()

router
  .get('/', ticketController.getAllTickets)
  .get('/:RefNumber', validator.getOneTicket, ticketController.getTicketByRefNumber)
  .get('/client/:RefNumber', ticketController.getTicketByRefNumberForClient)
  .post('/', validator.createTicket, ticketController.createTicket)

export default router
