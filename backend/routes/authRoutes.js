// POST /api/auth/login         → authController.login        (public)
// POST /api/auth/register      → authController.register     (public)
// GET  /api/auth/me            → authController.getMe        (requires auth)
const express = require('express')
const { register, login, getMe } = require('../controllers/authController.js')
const { authMiddleware } = require('../middleware/authMiddleware.js')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authMiddleware, getMe)
module.exports = router