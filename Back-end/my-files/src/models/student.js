import Student from './schemas/students'

const create = (data, options) => Student.create(data, options)

const deleteOne = (query) => Student.deleteOne(query)

const find = (query, fields = {}, options = {}) => Student.find(query, fields, options).lean()

const findOne = (query, fields = {}, options = {}) => Student.findOne(query, fields, options).lean()

// const findOneAndUpdate = (data) => Student.findOneAndUpdate({}, data, { upsert: true }).exec()

const findOneAndUpdate = (query, data) => Student.findOneAndUpdate(query, data, { upsert: true }).exec()

export default {
  create,
  deleteOne,
  find,
  findOne,
  findOneAndUpdate,
}
