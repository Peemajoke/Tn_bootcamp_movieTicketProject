import { HealthCheckError } from '@godaddy/terminus'

import { log } from '../app/libs/logger'

import mongooseClient from './mongoose'
import httpServer from './http'

const startup = async () => {
  const isHttpReady = await httpServer.isReady()
  if (!isHttpReady) {
    log.warn('Startup check is failed')
    throw new HealthCheckError(isHttpReady)
  }
  return Promise.resolve(isHttpReady)
}

const readiness = async () => {
  const isHttpReady = await httpServer.isReady()
  const isMongoReady = mongooseClient.isReady()

  // TODO:
  // Add your connection checking..
  const isEverythingReady = isHttpReady && isMongoReady

  const baseResponse = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    connection: {
      http: isHttpReady,
      mongo: isMongoReady,
    },
  }

  if (!isEverythingReady) {
    log.warn(`Readiness check is failed ${JSON.stringify(baseResponse)}`)
    throw new HealthCheckError(JSON.stringify(baseResponse))
  }

  return Promise.resolve(baseResponse)
}

const liveness = async () => {
  const isHttpReady = await httpServer.isReady()
  const isMongoReady = mongooseClient.isReady()

  // TODO:
  // Add your connection checking.
  const isEverythingReady = isHttpReady && isMongoReady

  const baseResponse = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    connection: {
      http: isHttpReady,
      mongo: isMongoReady,
    },
  }

  if (!isEverythingReady) {
    log.warn(`Liveness check is failed ${JSON.stringify(baseResponse)}`)
    throw new HealthCheckError(JSON.stringify(baseResponse))
  }

  return Promise.resolve(baseResponse)
}

export {
  startup,
  readiness,
  liveness,
}
