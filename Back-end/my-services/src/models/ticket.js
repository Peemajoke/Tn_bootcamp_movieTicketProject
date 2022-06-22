import Ticket from './schemas/tickets'

const create = (data, options) => Ticket.create(data, options)

const deleteOne = (query) => Ticket.deleteOne(query)

const find = (query, fields = {}, options = {}) => Ticket.find(query, fields, options).lean()

const findOne = (query, fields = {}, options = {}) => Ticket.findOne(query, fields, options).lean()

// const findOneAndUpdate = (data) => Ticket.findOneAndUpdate({}, data, { upsert: true }).exec()

const findOneAndUpdate = (query, data) => Ticket.findOneAndUpdate(query, data, { upsert: true }).exec()

export default {
  create,
  deleteOne,
  find,
  findOne,
  findOneAndUpdate,
}
