const MONGO_DB = {
  CONNECTING_FAILED: {
    serviceCode: 'MONGO_DB_CONNECT_FAILED',
    description: 'Can\'t connect to mongo',
  },
  CONNECTION_ERROR: {
    serviceCode: 'MONGO_DB_CONNECTION_ERROR',
    description: 'Mongo connection error',
  },
}

const SERVER = {
  STARTING_FAIED: {
    serviceCode: 'SERVER_START_FAILED',
    description: 'Can\'t start server',
  },
}

export { MONGO_DB, SERVER }
