const cors = require('cors')
const express = require('express')
require('dotenv').config()

const app = express()
app.use(cors())
app.options('*', cors())
const mongoose = require('mongoose')
const cardRoutes = require('./routes/cards')
const userRoutes = require('./routes/user')

// middleware
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
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
