import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { env } from '../config/env.js'

const deny = (res, status, message) => res.status(status).json({ success: false, message })

export async function requireAuth(req, res, next) {
  const token = req.cookies?.udaan_at
  if (!token) return deny(res, 401, 'Not signed in')
  try {
    const payload = jwt.verify(token, env.jwtAccessSecret)
    const user = await User.findById(payload.sub)
    if (!user || user.status !== 'active') return deny(res, 401, 'Not signed in')
    req.user = user
    return next()
  } catch {
    return deny(res, 401, 'Not signed in')
  }
}

export const requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user?.role) ? next() : deny(res, 403, 'You do not have access to this')