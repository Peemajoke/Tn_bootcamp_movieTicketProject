import executeValidator from './request'
import getOneMovie from './movie/getOneMovie'
import getOneTheater from './theater/getOneTheater'
import createTicket from './ticket/create'
import getOneTicket from './ticket/getOneTicket'
import login from './auth/login'
import register from './auth/register'

export default {
  createTicket: executeValidator(createTicket),
  login: executeValidator(login),
  register: executeValidator(register),
  getOneTicket: executeValidator(getOneTicket),
  getOneTheater: executeValidator(getOneTheater),
  getOneMovie: executeValidator(getOneMovie),
}
