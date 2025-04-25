const { Router } = require('express')

const { addToFavourite, getAllFavourites, removeFromFavourite } = require('../controllers/favouriteController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/add-to-favourite/:postId', authMiddleware, addToFavourite)
router.get('/get-favourite', authMiddleware, getAllFavourites)
router.delete("/remove-favourite/:postId", authMiddleware, removeFromFavourite);

module.exports = router