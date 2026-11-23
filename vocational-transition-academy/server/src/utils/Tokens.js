import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { env } from '../config/env.js'

const ACCESS_MS = 15 * 60 * 1000
const REFRESH_MS = 7 * 24 * 60 * 60 * 1000

export const signAccess = (user) =>
  jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtAccessSecret, { expiresIn: '15m' })

export const signRefresh = (user) =>
  jwt.sign({ sub: user._id.toString(), jti: crypto.randomUUID() }, env.jwtRefreshSecret, { expiresIn: '7d' })

export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex')

const base = { httpOnly: true, sameSite: 'lax', secure: env.nodeEnv === 'production' }

export function setAuthCookies(res, access, refresh) {
  res.cookie('udaan_at', access, { ...base, path: '/', maxAge: ACCESS_MS })
  res.cookie('udaan_rt', refresh, { ...base, path: '/api/v1/auth', maxAge: REFRESH_MS })
}

export function clearAuthCookies(res) {
  res.clearCookie('udaan_at', { ...base, path: '/' })
  res.clearCookie('udaan_rt', { ...base, path: '/api/v1/auth' })
}