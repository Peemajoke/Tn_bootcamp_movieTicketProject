// EXAMPLE
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  resumeCode: { type: Number, default: null },
  emails: [{ type: String }],
}, {
  versionKey: false,
  timestamps: true,
})

export default userSchema
