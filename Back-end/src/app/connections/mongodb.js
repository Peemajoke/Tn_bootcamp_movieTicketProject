import mongoose from 'mongoose'

import { databaseConfigs, APP_ENV } from '../../config'
import { MONGO_DB as MONGO_DB_INFO_MSG } from '../constants/infoMessage'
import { MONGO_DB as MONGO_DB_ERROR_MSG } from '../constants/errorMessage'
import { analyzer } from '../libs/logger'

let client = null

const wait = (time) => new Promise((resolve) => { setTimeout(resolve, time) })

const addConnectionEventListeners = () => {
  if (APP_ENV !== 'test') {
    mongoose.connection.on('connecting', () => analyzer.info(MONGO_DB_INFO_MSG.CONNECTING))
    mongoose.connection.on('connected', () => {
      analyzer.info({
        ...MONGO_DB_INFO_MSG.CONNECTED,
        description: `${MONGO_DB_INFO_MSG.CONNECTED.description} ${databaseConfigs.host}`,
      })
    })
    mongoose.connection.on('reconnected', () => {
      analyzer.info({
        ...MONGO_DB_INFO_MSG.RECONNECTED,
        description: `${MONGO_DB_INFO_MSG.RECONNECTED.description} ${databaseConfigs.host}`,
      })
    })
    mongoose.connection.on('disconnected', () => analyzer.info(MONGO_DB_INFO_MSG.DISCONNECTED))
    mongoose.connection.on('error', () => analyzer.info(MONGO_DB_ERROR_MSG.CONNECTION_ERROR))
  }
}

const connect = async (isReconnect, reconnectCredit = databaseConfigs.reconnectLimit) => {
  if (!client) {
    const options = {
      dbName: databaseConfigs.database,
      user: databaseConfigs.username,
      pass: databaseConfigs.password,
      authSource: databaseConfigs.authDatabase,
      autoIndex: databaseConfigs.autoIndex,
      ssl: databaseConfigs.ssl,
      useNewUrlParser: databaseConfigs.useNewUrlParser,
      useUnifiedTopology: databaseConfigs.useUnifiedTopology,
    }

    try {
      if (!isReconnect) addConnectionEventListeners()
      client = await mongoose.connect(databaseConfigs.host, options)
    } catch (error) {
      if (reconnectCredit > 0) {
        await wait(databaseConfigs.delayReconnectTime)
        await connect(true, reconnectCredit - 1)
      } else {
        analyzer.error({
          ...MONGO_DB_ERROR_MSG.CONNECTING_FAILED,
          description: `${MONGO_DB_ERROR_MSG.CONNECTING_FAILED.description} @${databaseConfigs.host}, error: ${error.message}`,
          connectOptions: options,
        })

        throw error
      }
    }
  }

  return client
}

const disconnect = async () => {
  client = null
  await mongoose.disconnect()
  mongoose.connection.removeAllListeners()
}

export default { connect, disconnect }
