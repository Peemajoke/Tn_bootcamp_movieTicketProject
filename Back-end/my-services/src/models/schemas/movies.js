import mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  column: { type: Number, required: true },
})

const ShowTimeSchema = new mongoose.Schema({
  theater: { type: Number, required: true },
  dateTime: { type: Date, required: true },
  reservedSeat: { type: [seatSchema], required: true },
})

const MovieSchema = new mongoose.Schema({
  // eslint-disable-next-line object-curly-newline
  movie_id: { type: String, required: true, trim: true, unique: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  genre: { type: String, required: true, trim: true },
  length: { type: Number, required: true },
  coverURL: { type: String, required: true, trim: true },
  showTime: { type: [ShowTimeSchema], required: true },
})

const MovieModel = mongoose.model('movie', MovieSchema)

export default MovieModel
export { MovieSchema }
