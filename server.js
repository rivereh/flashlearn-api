const cors = require('cors')
const express = require('express')
require('dotenv').config()

const app = express()
app.use(cors())
app.options('*', cors())
const mongoose = require('mongoose')
const cardRoutes = require('./routes/cards')
const userRoutes = require('./routes/user')

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/cards', cardRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to DB & server listening on port ${process.env.PORT}`
      )
    })
  })
  .catch((err) => {
    console.log(err)
  })
