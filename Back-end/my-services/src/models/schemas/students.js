import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  phone: { type: [String], required: true },
  zipcode: { type: String, required: true },
  _id: false,
})

const GpaSchema = new mongoose.Schema({
  grade: { type: Number, required: true },
  gpa: { type: Number, required: true },
  _id: false,
})

const StudentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, required: true },
    birthday: { type: Date, required: true },
    class: { type: String, required: true },
    contact: { type: ContactSchema, required: true },
    gpa: { type: [GpaSchema], required: true },
    club: { type: [String], required: true },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
)

const StudentModel = mongoose.model('student', StudentSchema)

export default StudentModel
export { StudentSchema }
