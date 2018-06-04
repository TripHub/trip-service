const express = require('express')
const bodyParser = require('body-parser')
import routes from './routes'

const app = express()
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/v1', routes)

// start accepting requests
app.listen(PORT, (err) => {
  if (err) {
    console.error('a server error occurred', err)
    process.exit(1)
  }

  console.log(`started at http://localhost:${PORT}`)
})
