const express = require('express')
require('dotenv').config()
const cors = require('cors')

const mongoose = require('mongoose')
const cardRoutes = require('./routes/cards')
const userRoutes = require('./routes/user')

const app = express()
const allowedOrigins = [
  'http://localhost:5173',
  'http://flashlearn.xyz',
  'http://flashlearnapp.xyz.s3-website-us-west-2.amazonaws.com',
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
    allowedHeaders: '*',
  })
)

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// middleware
app.use(express.json())

// routes
app.use('/api/cards/', cardRoutes)
app.use('/api/user/', userRoutes)

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
