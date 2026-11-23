// Which account roles may sign in through which portal.
export const PORTAL_ROLES = {
  trainee: ['trainee'],
  parent: ['parent'],
  partner: ['employer'],
  staff: ['admin', 'trainer'],
}
// Roles anyone may create from the public signup form. Never add admin or trainer here.
export const PUBLIC_SIGNUP_ROLES = ['trainee', 'parent', 'employer']
// Roles that must be approved by the academy before they can sign in.
export const PENDING_ROLES = ['employer']