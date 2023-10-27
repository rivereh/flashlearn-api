const Card = require('../models/cardModel')
const mongoose = require('mongoose')

// get all cards
const getCards = async (req, res) => {
  const user_id = req.user._id

  const cards = await Card.find({ user_id }).sort({ createdAt: -1 })
  res.status(200).json(cards)
}

// get a single workout
const getCard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such card' })
  }

  const card = await Card.findById(id)

  if (!card) {
    return res.status(404).json({ error: 'No such card' })
  }

  res.status(200).json(card)
}

// create new card
const createCard = async (req, res) => {
  const { front, back } = req.body

  let emptyFields = []

  if (!front) {
    emptyFields.push('front')
  }
  if (!back) {
    emptyFields.push('back')
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const card = await Card.create({ front, back, user_id })
    res.status(200).json(card)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteCard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such card' })
  }

  const card = await Card.findOneAndDelete({ _id: id })

  if (!card) {
    return res.status(400).json({ error: 'No such card' })
  }

  res.status(200).json(card)
}

// update a workout
const updateCard = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such card' })
  }

  const card = await Card.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  )

  if (!card) {
    return res.status(400).json({ error: 'No such card' })
  }

  res.status(200).json(card)
}

module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  updateCard,
}
