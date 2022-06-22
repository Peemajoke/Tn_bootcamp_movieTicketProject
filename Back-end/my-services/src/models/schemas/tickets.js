import mongoose from 'mongoose'

const ShowTimeSchema = new mongoose.Schema({
  theater: { type: Number, required: true },
  dateTime: { type: Date, required: true },
})

const ticketSchema = new mongoose.Schema({
  // eslint-disable-next-line object-curly-newline
  ref_num: { type: String, required: true, trim: true, unique: true },
  // eslint-disable-next-line object-curly-newline
  email: { type: String, required: true, trim: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  showTime: { type: ShowTimeSchema, required: true },
  seat: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
})

const TicketModel = mongoose.model('ticket', ticketSchema)

export default TicketModel
export { ticketSchema }
