import express from 'express'
import authController from '../controllers/auth'
import validator from '../request'

const router = express.Router()

router
  .post('/register', authController.registerUser)
  .post('/login', authController.login)
  .get('/logout', authController.logout)
  .get('/me', authController.getMe)

export default router
