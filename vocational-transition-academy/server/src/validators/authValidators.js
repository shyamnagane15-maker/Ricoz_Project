import { z } from 'zod'
import { PORTAL_ROLES, PUBLIC_SIGNUP_ROLES } from '../utils/roles.js'

const email = z.string().trim().toLowerCase().email('Enter a valid email address')

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name').max(100, 'Name is too long'),
    email,
    password: z.string().min(10, 'Password must be at least 10 characters').max(128, 'Password is too long'),
    role: z.enum(PUBLIC_SIGNUP_ROLES, { message: 'Choose a valid account type' }),
    organizationName: z.string().trim().max(150, 'Organization name is too long').optional(),
    language: z.enum(['en', 'hi']).default('en'),
  })
  .refine((d) => d.role !== 'employer' || (d.organizationName && d.organizationName.length > 1), {
    message: 'Enter your organization name',
    path: ['organizationName'],
  })

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Enter your password'),
  portal: z.enum(Object.keys(PORTAL_ROLES), { message: 'Choose a portal' }),
})

export function fieldErrors(error) {
  const out = {}
  for (const issue of error.issues) {
    const key = issue.path[0] ?? 'form'
    out[key] ??= issue.message
  }
  return out
}