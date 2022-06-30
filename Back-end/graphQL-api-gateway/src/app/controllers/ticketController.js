import ticketService from '../services/ticketService'

const getTicketList = async ()  => {
    try {
      const response = await ticketService.getTicketList()
      console.log(response.data)
      return {data: response.data}
    } catch (error) {
      console.log(error)
    }
  }
  
  const getTicketByID = async (ref_num) => {
    try {
      const response = await ticketService.getTicketByID(ref_num)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getTicketByIDForClient = async (ref_num, tokenData) => {
    console.log('here')
    console.log(tokenData)
    try {
      const response = await ticketService.getTicketByIDForClient(ref_num, tokenData)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  
  const createTicket = async (ticketData) => {
    try {
      const response = await ticketService.createTicket(ticketData)
      return {
        data: response.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  export default {
    getTicketList,
    getTicketByID,
    getTicketByIDForClient,
    createTicket,
  }