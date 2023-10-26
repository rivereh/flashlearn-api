const express = require('express')
const {
  createCard,
  getCards,
  getCard,
  deleteCard,
  updateCard
} = require('../controllers/cardController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getCards)

// GET a single workout
router.get('/:id', getCard)

// POST a new workout
router.post('/', createCard)

// DELETE a workout
router.delete('/:id', deleteCard)

// UPDATE a workout
router.patch('/:id', updateCard)

module.exports = router
