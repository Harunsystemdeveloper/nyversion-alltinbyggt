import { useEffect, useState } from 'react'
import { apiDelete, apiGet } from '../api'

export interface User {
  id: number
  created?: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const data = await apiGet<User[]>('/users')
    setUsers(data)
    setLoading(false)
  }

  async function remove(id: number) {
    await apiDelete(`/users/${id}`)
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  useEffect(() => { load() }, [])

  return { users, loading, load, remove }
}

