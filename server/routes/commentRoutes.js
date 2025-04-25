const { Router } = require('express')

const { createComment, getComments, editComment, deleteComment } = require('../controllers/commentControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/create/:postId', authMiddleware, createComment)
router.get('/getComments/:postId', getComments)
router.patch('/editComments', authMiddleware, editComment)
router.delete('/deleteComments/:postId', authMiddleware, deleteComment)

module.exports = router