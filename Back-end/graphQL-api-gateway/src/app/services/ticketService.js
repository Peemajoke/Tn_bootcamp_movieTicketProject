import request from '../lib/request'
import { URL_SERVICE } from '../config'

const getTicketList = () => request.get(`${URL_SERVICE}/tickets`)
const getTicketByID = (ref_num) => request.get(`${URL_SERVICE}/tickets/${ref_num}`)
const getTicketByIDForClient = (ref_num, tokenData) => request.get(`${URL_SERVICE}/tickets/client/${ref_num}`, { ...tokenData })
const createTicket = (ticketsData) => request.post(`${URL_SERVICE}/tickets`, { ...ticketsData })

export default {
  getTicketList,
  getTicketByID,
  getTicketByIDForClient,
  createTicket,
}
