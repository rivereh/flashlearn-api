const express = require('express')
const cors = require('cors')

const app = express()

// Use the cors middleware
app.use(
  cors({
    origin: '', // Note: Using '' is a security risk, prefer specifying domains
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.get('/test', (req, res) => {
  res.json({ message: 'Hello, World!' })
})

app.listen(4000, () => {
  console.log('Server started on http://localhost:4000')
})
