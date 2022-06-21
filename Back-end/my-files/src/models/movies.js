import Movie from './schemas/movies'

const create = (data, options) => Movie.create(data, options)

const deleteOne = (query) => Movie.deleteOne(query)

const find = (query, fields = {}, options = {}) => Movie.find(query, fields, options).lean()

const findOne = (query, fields = {}, options = {}) => Movie.findOne(query, fields, options).lean()

// const findOneAndUpdate = (data) => Movie.findOneAndUpdate({}, data, { upsert: true }).exec()

const findOneAndUpdate = (query, data) => Movie.findOneAndUpdate(query, data, { upsert: true }).exec()

export default {
  create,
  deleteOne,
  find,
  findOne,
  findOneAndUpdate,
}
