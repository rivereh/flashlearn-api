const cors = require('cors')
const express = require('express')

const app = express()

app.use(
  cors({
    origin: 'http://flashlearnapp.xyz',
    credentials: true,
  })
)

const mongoose = require('mongoose')
const cardRoutes = require('./routes/cards')
const userRoutes = require('./routes/user')

require('dotenv').config()

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
