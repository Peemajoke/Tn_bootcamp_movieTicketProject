import express from 'express'
import authController from '../controllers/auth'
import validator from '../request'

const router = express.Router()

router
  .post('/register', validator.register, authController.registerUser)
  .post('/login', validator.login, authController.login)
  .get('/logout', authController.logout)
  .get('/me', authController.getMe)

export default router
