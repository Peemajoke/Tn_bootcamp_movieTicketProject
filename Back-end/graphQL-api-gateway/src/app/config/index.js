/* @flow */
import dotenv from 'dotenv'

dotenv.config()

export const {
  NODE_PORT,
  NODE_ENV,
  APP_ENV,
  URL_PREFIX,
  URL_SERVICE
} = process.env
