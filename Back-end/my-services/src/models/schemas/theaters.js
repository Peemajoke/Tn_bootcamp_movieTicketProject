import mongoose from 'mongoose'

const theaterSchema = new mongoose.Schema({
  theaterNumber: { type: Number, required: true },
  allSeat: [Number], // [x,y,z] means row 1 has x seats, row 2 has y seats, row3 has z seats
})

const TheaterModel = mongoose.model('theater', theaterSchema)

export default TheaterModel
export { theaterSchema }
