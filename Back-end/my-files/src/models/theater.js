import Theater from './schemas/theaters'

const create = (data, options) => Theater.create(data, options)

const deleteOne = (query) => Theater.deleteOne(query)

const find = (query, fields = {}, options = {}) => Theater.find(query, fields, options).lean()

const findOne = (query, fields = {}, options = {}) => Theater.findOne(query, fields, options).lean()

// const findOneAndUpdate = (data) => Theater.findOneAndUpdate({}, data, { upsert: true }).exec()

const findOneAndUpdate = (query, data) => Theater.findOneAndUpdate(query, data, { upsert: true }).exec()

export default {
  create,
  deleteOne,
  find,
  findOne,
  findOneAndUpdate,
}
