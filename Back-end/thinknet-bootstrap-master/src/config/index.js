export const databaseConfigs = {
  host: process.env.DB_URL,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  authDatabase: process.env.DB_AUTH_SOURCE,
  ssl: process.env.DB_SSL === 'true',
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
  delayReconnectTime: parseInt(process.env.DB_DELAY_RECONNECT_MS, 10) || 5000,
  reconnectLimit: parseInt(process.env.DB_RECONNECT_LIMIT, 10) || 5,
  autoIndex: process.env.DB_AUTO_INDEX === 'true',
}

export const {
  APP_ENV,
  NODE_ENV,
  NODE_PORT,
  URL_PREFIX,
  K8S_TERMINATION_GRACE_PERIOD_MS,
} = process.env
