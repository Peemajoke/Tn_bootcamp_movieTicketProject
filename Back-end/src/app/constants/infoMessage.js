const MONGO_DB = {
  CONNECTING: {
    serviceCode: 'MONGO_DB_CONNECTING',
    description: 'Connecting MongoDB...',
  },
  CONNECTED: {
    serviceCode: 'MONGO_DB_CONNECTED',
    description: 'Mongoose connection has been connected to',
  },
  DISCONNECTED: {
    serviceCode: 'MONGO_DB_DISCONNECTED',
    description: 'Mongoose connection has been disconnected!.',
  },
  RECONNECTED: {
    serviceCode: 'MONGO_DB_RECONNECTED',
    description: 'Mongoose connection has been reconnected to',
  },
}

export { MONGO_DB }
