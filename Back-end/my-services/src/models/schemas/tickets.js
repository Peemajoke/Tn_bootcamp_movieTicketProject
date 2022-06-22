import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  ref_num: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  movie: {type: String, required: true, trim: true},
  theater: { type: Number, required: true },
  dateTime: { type: Date, required: true },
  seat: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
})

const TicketModel = mongoose.model('ticket', ticketSchema)

export default TicketModel
export { ticketSchema }
