const express = require('express')
const router= express.Router()
const {getMovies, setMovies, updateMovies, deleteMovies}=require('../controllers/movieController')

const {protect}= require('../middleware/authMiddleware')

router.route('/').get(protect, getMovies).post(protect, setMovies)
router.route('/:id').put(protect, updateMovies).delete(protect, deleteMovies)

// router.get('/', getGoals)

// router.post('/', setGoals )

// router.put('/:id', updateGoals)

// router.delete('/:id', deleteGoals )

module.exports = router