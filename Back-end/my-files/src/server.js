import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import routesMovie from './routes/movie'
import routesTheater from './routes/theater'
import routeesTicket from './routes/ticket'
import routesAuth from './routes/auth'

const app = express()

const PORT = 3000

// const database = 'mongodb+srv://Peem:0858@tnbootcampexpressactivi.vwfz1c6.mongodb.net/school?retryWrites=true&w=majority'
const database = 'mongodb+srv://Peem:0858@tnmovieticketcluster.afivcax.mongodb.net/MovieTicketProject?retryWrites=true&w=majority'

mongoose.Promise = global.Promise
mongoose.connect(database, { useNewUrlParser: true }).then(
  () => {
    console.log('[success] : connected to the database ')
  },
  (error) => {
    console.log(`[failed] : ${error}`)
    process.exit()
  },
)

app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

// route to check if connection is ok.
app.get('/healthz', (req, res) => res.status(200).json({ status: 'ok' }))

// route zone :)
app.use('/api/v1/movies', routesMovie)
app.use('/api/v1/theaters', routesTheater)
app.use('/api/v1/tickets', routeesTicket)
app.use('/api/v1/auth', routesAuth)

app.listen(PORT, (err) => {
  if (err) console.log('Error in server setup')
  console.log('Server listening on Port', PORT)
})
