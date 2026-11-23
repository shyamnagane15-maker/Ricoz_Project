import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'
import { AuthContext } from './auth-context'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    api('/auth/me')
      .then((d) => alive && setUser(d.data.user))
      .catch(() => alive && setUser(null))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const login = useCallback(async (portal, email, password) => {
    const d = await api('/auth/login', { method: 'POST', body: { portal, email, password } })
    setUser(d.data.user)
    return d.data.user
  }, [])

  const register = useCallback(async (fields) => {
    const d = await api('/auth/register', { method: 'POST', body: fields })
    if (d.data.user) setUser(d.data.user)
    return d.data
  }, [])

  const logout = useCallback(async () => {
    try {
      await api('/auth/logout', { method: 'POST' })
    } catch {
      /* clear local state regardless */
    }
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}