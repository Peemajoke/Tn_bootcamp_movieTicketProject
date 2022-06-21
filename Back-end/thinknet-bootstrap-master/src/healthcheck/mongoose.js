import mongoose from 'mongoose'

const isReady = () => mongoose.connection.readyState === 1

const isAlive = () => mongoose.connection.readyState === 1

export default {
  isReady,
  isAlive,
}
