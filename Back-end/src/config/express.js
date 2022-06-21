import bodyParser from 'body-parser'
import methodOverride from 'method-override'

import { APP_ENV } from './index'

const env = APP_ENV || 'development'

export default (app) => {
  app.use('/favicon.ico', (req, res) => res.sendStatus(204))
  app.use(bodyParser.json({ limit: '20mb' }))
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
  app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method
      delete req.body._method
      return method
    }
  }))

  if (env === 'development') {
    Object.assign(app.locals, { pretty: true })
  }
}
