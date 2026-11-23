import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { connectDatabase } from '../config/db.js'
import User from '../models/User.js'

const { STAFF_NAME = 'Academy Admin', STAFF_EMAIL, STAFF_PASSWORD, STAFF_ROLE = 'admin' } = process.env

if (!STAFF_EMAIL || !STAFF_PASSWORD || !['admin', 'trainer'].includes(STAFF_ROLE) || STAFF_PASSWORD.length < 10) {
  console.error('Set STAFF_EMAIL, STAFF_PASSWORD (10+ characters) and STAFF_ROLE (admin or trainer).')
  process.exit(1)
}

await connectDatabase()
const email = STAFF_EMAIL.trim().toLowerCase()
if (await User.exists({ email })) {
  console.log('An account with that email already exists. Nothing changed.')
} else {
  await User.create({
    name: STAFF_NAME,
    email,
    passwordHash: await bcrypt.hash(STAFF_PASSWORD, 12),
    role: STAFF_ROLE,
    status: 'active',
  })
  console.log(`Created ${STAFF_ROLE} account for ${email}`)
}
await mongoose.disconnect()