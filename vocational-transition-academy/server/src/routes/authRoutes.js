import { Router } from 'express'
import { register, login, refresh, logout, me } from '../controllers/authController.js'
import { requireAuth } from '../middleware/auth.js'
import { loginLimiter, registerLimiter } from '../middleware/rateLimiters.js'

const router = Router()

router.post('/register', registerLimiter, register)
router.post('/login', loginLimiter, login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.get('/me', requireAuth, me)

export default router