const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

import {
  handleNotFoundError,
  handleValidationError,
  handleUnknownError,
} from './utils/middleware/error'
import { hasAccessToken } from './utils/request/auth'
import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3000

// enable cors
app.use(cors())

// parse JWT in Authorization header
app.use(hasAccessToken)

// install middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// all routes require authorisation
// app.use(hasAccessToken)
// versioned endpoints
app.use('/v1', routes)

// error handlers
app.use(handleNotFoundError)
app.use(handleValidationError)
app.use(handleValidationError)

// start accepting requests
app.listen(PORT, (err) => {
  if (err) {
    console.error('a server error occurred', err)
    process.exit(1)
  }
  // setup conenction to database
  require('./utils/db')
  // good to go!
  console.log('trip service listening')
})
