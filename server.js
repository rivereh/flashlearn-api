const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()
// app.use(cors())
const mongoose = require('mongoose')
const cardRoutes = require('./routes/cards')
const userRoutes = require('./routes/user')

// middleware
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') //replace localhost with actual host
  res.header('Access-Control-Allow-Origin', '54.214.110.106') //replace localhost with actual host
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, PUT, PATCH, POST, DELETE'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, X-Requested-With, Authorization'
  )

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
