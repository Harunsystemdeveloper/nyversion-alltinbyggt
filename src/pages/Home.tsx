import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../hooks/useAuth'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
  const { posts } = usePosts()
  const { user } = useAuth()

  return (
    <div className="page-wrapper">

      {/* ✅ Titel + introtext (från mockup) */}
      <h1 className="home-title">Digital Anslagstavla</h1>
      <p className="home-subtitle">
        Här kan du se inlägg, skapa egna och hålla dig uppdaterad.
      </p>

      {/* ✅ Lista av posts */}
      <div className="d-grid gap-3">
        {posts.map(p => (
          <Card key={p.id} className="post-card">
            <Card.Body>
              <Card.Title>{p.title}</Card.Title>
              <Card.Text>{p.content}</Card.Text>

              {user && (
                <>
                  {/* @ts-expect-error React Bootstrap typing bug */}
                  <Button
                    as={Link}
                    to={`/edit/${p.id}`}
                    variant="primary"
                    size="sm"
                  >
                    Redigera
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}









