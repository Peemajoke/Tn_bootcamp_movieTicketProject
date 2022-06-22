import app, { apolloServer } from './app'
import { APP_ENV, NODE_PORT } from './app/config'

const task = APP_ENV || 'development'
const port = NODE_PORT || 8080

let server 
if (task !== 'test') {
  server = app.listen(port)
  console.log(`Server running at port ${port}${apolloServer.graphqlPath}`)
}
