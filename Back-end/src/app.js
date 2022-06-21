import observer from '@thinknet/observer'
import express from 'express'
import { expressErrorResponse, handlePageNotFound } from '@thinknet/express-response-error'

import configExpress from './config/express'
import routes from './app/routes'
import { URL_PREFIX } from './config'

const app = express()

configExpress(app)

app.use(observer.trace())
app.use(observer.accesslog())
app.use(observer.collectDefaultMetrics())
app.get('/metrics', observer.getMetrics())

app.use(`${URL_PREFIX}`, routes)

app.use(handlePageNotFound())
app.use(observer.traceException())
app.use(expressErrorResponse({ enableLog: false }))

export default app
