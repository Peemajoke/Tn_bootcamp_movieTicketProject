// EXAMPLE
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'

import userSchema from './schemas/user'

const model = mongoose.model('users', userSchema)

model._nextID = () => new Promise((resolve, reject) => {
  model.nextCount((error, nextCount) => {
    if (error) {
      reject(error)
      return
    }
    resolve(nextCount)
  })
})

export default model
