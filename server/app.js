const express = require('express')
const cors = require('cors')
const api = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/ping', (req, res) => {
  res.send(`PONG ${new Date()}`)
})

app.use('/todo', api.todo)

module.exports = app
