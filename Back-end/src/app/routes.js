import express from 'express'

import requests from './requests'
import controllers from './controllers'

const router = express.Router()

router
  .get('/users/:id', controllers.user.getByID)
  .post('/users', requests.createUserRequest, controllers.user.create)

export default router
