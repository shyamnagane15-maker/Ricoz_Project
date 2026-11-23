
export const PORTALS = {
  trainee: { signupRole: 'trainee' },
  parent: { signupRole: 'parent' },
  partner: { signupRole: 'employer' },
  staff: { signupRole: null }, // staff accounts are created by the academy, never by signup
}
export const PORTAL_KEYS = Object.keys(PORTALS)