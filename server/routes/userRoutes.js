const { Router } = require('express')

const { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors, forgotPassword, resetPassword, contactUsMessage } = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/:id', getUser)
router.get('/', getAuthors)
router.post('/change-avatar', authMiddleware, changeAvatar)
router.patch('/edit-user', authMiddleware, editUser)
router.post('/contact-us', contactUsMessage)

module.exports = router