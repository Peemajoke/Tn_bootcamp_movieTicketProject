import { createTerminus } from '@godaddy/terminus'

import database from './app/connections/mongodb'
import { log, analyzer } from './app/libs/logger'
import { SERVER as SERVER_ERROR_MSG } from './app/constants/errorMessage'
import app from './app'
import {
  APP_ENV,
  NODE_PORT,
  K8S_TERMINATION_GRACE_PERIOD_MS,
} from './config'
import { readiness, liveness, startup } from './healthcheck'

const prepareComponentsForStart = () => Promise.all([database.connect()])

const cleanupComponentsForShutdown = () => Promise.all([database.disconnect()])

const beforeShutdown = (server) => () => {
  log.info(`Graceful shutdown is starting, trying to complete remaining connections in ${K8S_TERMINATION_GRACE_PERIOD_MS / 1000} seconds`)

  return new Promise((resolve) => {
    let secondsLeft = K8S_TERMINATION_GRACE_PERIOD_MS
    if (process.env.NODE_ENV === 'production') {
      setInterval(() => {
        server.getConnections((error, count) => {
          secondsLeft -= 1000
          log.warn(`server has ${count} connections remaining. ${parseInt(secondsLeft / 1000, 10)} seconds left.`)
        })
      }, 1000)

      setTimeout(resolve, K8S_TERMINATION_GRACE_PERIOD_MS)
    } else {
      resolve(true)
    }
  })
}

const startServer = async () => {
  try {
    if (APP_ENV !== 'test') {
      const server = app.listen(NODE_PORT)

      createTerminus(server, {
        signals: ['SIGTERM', 'SIGINT'],
        healthChecks: {
          '/startz': () => startup(),
          '/readyz': () => readiness(),
          '/livez': () => liveness(),
        },
        beforeShutdown: beforeShutdown(server),
        onShutdown: () => log.info('Graceful shutdown down has been finished.'),
        onSignal: cleanupComponentsForShutdown,
        timeout: K8S_TERMINATION_GRACE_PERIOD_MS,
        logger: log.info,
      })
    }

    await prepareComponentsForStart()
    log.info(`Server is running at port: ${NODE_PORT}`)
  } catch (error) {
    cleanupComponentsForShutdown()
    analyzer.error({
      ...SERVER_ERROR_MSG.STARTING_FAIED,
      description: `${SERVER_ERROR_MSG.STARTING_FAIED.description} ${error.message}`,
    })
  }
}

startServer()
