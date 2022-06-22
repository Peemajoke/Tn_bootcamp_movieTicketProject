import request from '../lib/request'
import { URL_SERVICE } from '../config'

const getTicketList = () => request.get(`${URL_SERVICE}/tickets`)
const getTicketByID = (ref_num) => request.get(`${URL_SERVICE}/tickets/${ref_num}`)
const createTicket = (ticketsData) => request.post(`${URL_SERVICE}/tickets`, { ...ticketsData })

export default {
  getTicketList,
  getTicketByID,
  createTicket,
}
