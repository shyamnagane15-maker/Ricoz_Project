import rateLimit from 'express-rate-limit'

const make = (windowMs, limit) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message: 'Too many attempts. Please wait a few minutes and try again.' },
  })

export const loginLimiter = make(15 * 60 * 1000, 20)
export const registerLimiter = make(60 * 60 * 1000, 20)