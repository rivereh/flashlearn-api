const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()

const mongoose = require('mongoose')
const cardRoutes = require('./routes/cards')
const userRoutes = require('./routes/user')

app.use(
  cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'POST', 'PATCH'],
  })
)

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// middleware
app.use(express.json())

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
