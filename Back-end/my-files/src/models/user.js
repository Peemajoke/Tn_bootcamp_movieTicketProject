import User from './schemas/users'

const create = (data, options) => User.create(data, options)

const deleteOne = (query) => User.deleteOne(query)

const find = (query, fields = {}, options = {}) => User.find(query, fields, options)

const findOne = (query, fields = {}, options = {}) => User.findOne(query, fields, options)

// const findOneAndUpdate = (data) => User.findOneAndUpdate({}, data, { upsert: true }).exec()

const findOneAndUpdate = (query, data) => User.findOneAndUpdate(query, data, { upsert: true }).exec()

export default {
  create,
  deleteOne,
  find,
  findOne,
  findOneAndUpdate,
}
