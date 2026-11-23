import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { env } from '../config/env.js'
import { registerSchema, loginSchema, fieldErrors } from '../validators/authValidators.js'
import { PORTAL_ROLES, PENDING_ROLES } from '../utils/roles.js'
import { signAccess, signRefresh, hashToken, setAuthCookies, clearAuthCookies } from '../utils/Tokens.js'

const COST = 12
// Compared against when the email is unknown, so timing does not reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', COST)

const toPublic = (u) => ({
  id: u._id.toString(),
  name: u.name,
  email: u.email,
  role: u.role,
  status: u.status,
  organizationName: u.organizationName ?? null,
  language: u.language,
})

async function startSession(res, user) {
  const access = signAccess(user)
  const refresh = signRefresh(user)
  await User.updateOne({ _id: user._id }, { refreshTokenHash: hashToken(refresh) })
  setAuthCookies(res, access, refresh)
}

export async function register(req, res) {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Please check the highlighted fields.', errors: fieldErrors(parsed.error) })
  }
  const { name, email, password, role, organizationName, language } = parsed.data
  const taken = { success: false, message: 'An account with this email already exists.', errors: { email: 'An account with this email already exists.' } }

  if (await User.exists({ email })) return res.status(409).json(taken)

  const pending = PENDING_ROLES.includes(role)
  let user
  try {
    user = await User.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, COST),
      role,
      status: pending ? 'pending' : 'active',
      organizationName: role === 'employer' ? organizationName : undefined,
      language,
    })
  } catch (err) {
    if (err?.code === 11000) return res.status(409).json(taken)
    throw err
  }

  if (pending) {
    return res.status(201).json({ success: true, message: 'Account created and waiting for approval.', data: { pending: true } })
  }
  await startSession(res, user)
  return res.status(201).json({ success: true, message: 'Account created.', data: { user: toPublic(user), pending: false } })
}

export async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Enter your email and password.', errors: fieldErrors(parsed.error) })
  }
  const { email, password, portal } = parsed.data

  const user = await User.findOne({ email }).select('+passwordHash')
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH)
  if (!user || !ok) return res.status(401).json({ success: false, message: 'Invalid email or password.' })

  if (user.status === 'pending') {
    return res.status(403).json({ success: false, message: 'Your account is waiting for academy approval.' })
  }
  if (user.status !== 'active') {
    return res.status(403).json({ success: false, message: 'This account is not active. Please contact the academy.' })
  }
  if (!PORTAL_ROLES[portal].includes(user.role)) {
    return res.status(403).json({ success: false, message: 'This account is not registered for this portal. Go back and choose another.' })
  }

  await startSession(res, user)
  return res.json({ success: true, message: 'Signed in.', data: { user: toPublic(user) } })
}

export async function refresh(req, res) {
  const token = req.cookies?.udaan_rt
  const fail = () => res.status(401).json({ success: false, message: 'Not signed in' })
  if (!token) return fail()
  try {
    const payload = jwt.verify(token, env.jwtRefreshSecret)
    const user = await User.findById(payload.sub).select('+refreshTokenHash')
    if (!user || user.status !== 'active' || user.refreshTokenHash !== hashToken(token)) return fail()
    await startSession(res, user)
    return res.json({ success: true, message: 'Session renewed.', data: { user: toPublic(user) } })
  } catch {
    return fail()
  }
}

export async function logout(req, res) {
  const token = req.cookies?.udaan_rt
  if (token) {
    try {
      const payload = jwt.verify(token, env.jwtRefreshSecret)
      await User.updateOne({ _id: payload.sub }, { refreshTokenHash: null })
    } catch {
      /* token already invalid: nothing to revoke */
    }
  }
  clearAuthCookies(res)
  return res.json({ success: true, message: 'Signed out.' })
}

export const me = (req, res) => res.json({ success: true, data: { user: toPublic(req.user) } })