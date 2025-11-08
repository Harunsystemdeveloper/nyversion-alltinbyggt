import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../hooks/useAuth'
import { Card, Form } from 'react-bootstrap'
import { CATEGORIES } from '../constants/categories'
import { Link } from 'react-router-dom'

export default function Home() {
  const { posts, remove } = usePosts()
  const { user } = useAuth()

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "" || p.category === categoryFilter)
  )

  return (
    <div className="page-wrapper">

      <h1 className="home-title">Digital Anslagstavla</h1>
      <p className="home-subtitle">
        Här kan du se inlägg, skapa egna och hålla dig uppdaterad.
      </p>

      <div className="d-flex gap-2 mb-3">
        <Form.Control
          placeholder="Sök..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: "250px" }}
        />

        <Form.Select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Alla kategorier</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Form.Select>
      </div>

      <div className="d-grid gap-3">
        {filteredPosts.map(p => (
          <Card key={p.id} className="post-card">
            <Card.Body>
              <Card.Title>{p.title}</Card.Title>
              <Card.Text>{p.content}</Card.Text>

              <small><b>Kategori:</b> {p.category || "Ingen"}</small><br />
              <small><b>Kontakt:</b> {p.email || "-"}</small><br />

              {user && (
                <Link
                  to={`/edit/${p.id}`}
                  className="btn btn-primary btn-sm mt-2"
                >
                  Redigera
                </Link>
              )}
              {user && (user.role === 'admin' || user.email === p.email) && p.id != null && (
                <button
                  className="btn btn-danger btn-sm mt-2 ms-2"
                  onClick={() => remove(p.id!)}
                >
                  Ta bort
                </button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}











