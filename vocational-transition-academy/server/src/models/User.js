import mongoose from 'mongoose'

export const ROLES = ['admin', 'trainer', 'trainee', 'parent', 'employer']

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, required: true },
    status: { type: String, enum: ['active', 'pending', 'disabled'], default: 'active' },
    organizationName: { type: String, trim: true, maxlength: 150 },
    language: { type: String, enum: ['en', 'hi'], default: 'en' },
    refreshTokenHash: { type: String, select: false, default: null },
  },
  { timestamps: true },
)

export default mongoose.model('User', userSchema)