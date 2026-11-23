const BASE = '/api/v1'
const NO_REFRESH = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout']
let refreshing = null

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message)
    this.status = status
    this.errors = errors || {}
  }
}

async function send(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  let data = null
  try {
    data = await res.json()
  } catch {
    /* no JSON body */
  }
  return { res, data }
}

export async function api(path, options = {}) {
  let { res, data } = await send(path, options)
  if (res.status === 401 && !NO_REFRESH.includes(path)) {
    // One shared refresh, so parallel requests do not rotate the token twice.
    refreshing ??= send('/auth/refresh', { method: 'POST' }).finally(() => {
      refreshing = null
    })
    const result = await refreshing
    if (result.res.ok) ({ res, data } = await send(path, options))
  }
  if (!res.ok) throw new ApiError(data?.message || 'Something went wrong', res.status, data?.errors)
  return data
}