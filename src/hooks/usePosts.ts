import { useState, useEffect } from 'react'
import { apiGet, apiPost, apiPut, apiDelete } from '../api'

export interface Post {
  id?: number
  title: string
  content: string
  category?: string
  email?: string
  createdAt?: string
  updatedAt?: string
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const data = await apiGet('/posts')
    setPosts(data)
    setLoading(false)
  }

  async function add(title: string, content: string, category?: string, email?: string) {
    const payload: any = { title, content }
    if (category) payload.category = category
    if (email) payload.email = email

    const post = await apiPost('/posts', payload)
    setPosts(prev => [post, ...prev])
  }


  async function edit(id: number, title: string, content: string, category?: string, email?: string) {
    const payload: any = { title, content }
    if (category) payload.category = category
    if (email) payload.email = email

    const updated = await apiPut(`/posts/${id}`, payload)
    setPosts(prev => prev.map(p => (p.id === id ? updated : p)))
  }

  async function remove(id: number) {
    await apiDelete(`/posts/${id}`)
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  useEffect(() => {
    load()
  }, [])

  return { posts, loading, add, edit, remove }
}
