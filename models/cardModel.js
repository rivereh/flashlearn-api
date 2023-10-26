const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema(
  {
    front: {
      type: String,
      required: true
    },
    back: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Card', cardSchema)
