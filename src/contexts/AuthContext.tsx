import { createContext, useContext, useEffect, useState } from 'react'
import { apiDelete, apiGet, apiPost } from '../api'

export type AuthUser = {
  id: number
  email: string
  firstName?: string
  lastName?: string
  role: string
  [key: string]: any
}

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

function isError(x: any): x is { error: string } {
  return x && typeof x === 'object' && typeof (x as any).error === 'string'
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  async function refresh() {
    try {
      const data = await apiGet<AuthUser | { error: string }>('/login')
      setUser(isError(data) ? null : data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  async function login(email: string, password: string) {
    const data = await apiPost<AuthUser | { error: string }>(
      '/login',
      { email, password }
    )
    if (isError(data)) throw new Error(data.error)
    setUser(data)
  }

  async function logout() {
    await apiDelete('/login')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}

