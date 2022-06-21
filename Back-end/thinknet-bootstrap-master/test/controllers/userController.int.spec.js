// EXAMPLE
import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../../src/app'
import database from '../../src/app/connections/mongodb'
import { URL_PREFIX } from '../../src/config'

const request = supertest(app)

describe('[integration] userController', () => {
  beforeAll(async () => {
    await database.connect()
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await database.disconnect()
  })

  describe('[function] create', () => {
    const routeName = `${URL_PREFIX}/users`
    const userData = {
      id: 93993,
      resumeCode: 2321,
      emails: ['michael@gmail.com'],
    }

    afterEach(async () => {
      const userCollectionInstance = mongoose.connection.db.collection('users')
      await userCollectionInstance.deleteMany({})
    })

    it('Should create user successfully', async () => {
      const response = await request.post(routeName).send(userData)
      expect(response.status).toEqual(201)
      expect(response.body).toMatchObject(userData)
      expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBe(true)
      expect(Date.parse(response.body.createdAt)).not.toBeNaN()
      expect(Date.parse(response.body.updatedAt)).not.toBeNaN()

      const userCollectionInstance = mongoose.connection.db.collection('users')
      const userCreated = await userCollectionInstance.findOne({ id: userData.id })()
      expect(userCreated).toMatchObject(userData)
      expect(mongoose.Types.ObjectId.isValid(userCreated._id)).toBe(true)
      expect(Date.parse(userCreated.createdAt)).not.toBeNaN()
      expect(Date.parse(userCreated.updatedAt)).not.toBeNaN()
    })
  })
})
