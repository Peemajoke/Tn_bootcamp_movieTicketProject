/* eslint-disable no-useless-escape */
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  // eslint-disable-next-line object-curly-newline
  email: { type: String, required: true, trim: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  password: { type: String, required: true, trim: true },
})

// Encrypt password using bcrypt
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Match user entered password to hashed password in DB
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password) // bcrypt.compare will decrypt the this.password (password form DB) before compare.
}

// Sign JWT and return
// This will create a function to UserSchema
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, 'amongus', {
    expiresIn: '30d',
  })
}

UserSchema.methods.testLog = function () {
    console.log("YEE")
    return "nope"
  }

const UserModel = mongoose.model('user', UserSchema)
// module.exports = mongoose.model('user', UserSchema)

export default UserModel
export { UserSchema }
