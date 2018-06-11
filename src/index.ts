const express = require('express')
const bodyParser = require('body-parser')
import { NotFoundError, ValidationError } from 'objection'
import errorHandlers from './utils/middleware/error'
import { hasAccessToken } from './utils/request/auth'
import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// all routes require authorisation
// app.use(hasAccessToken)
// versioned endpoints
app.use('/v1', routes)
app.use(errorHandlers)

// start accepting requests
app.listen(PORT, (err) => {
  if (err) {
    console.error('a server error occurred', err)
    process.exit(1)
  }
  // setup conenction to database
  require('.utils/db')
  // good to go!
  console.log(`started at http://localhost:${PORT}`)
})
