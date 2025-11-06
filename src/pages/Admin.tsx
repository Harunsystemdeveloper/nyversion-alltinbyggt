import { usePosts } from '../hooks/usePosts'
import { useUsers } from '../hooks/useUsers'
import { Button, Card, Tab, Tabs, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Admin() {
  const { posts, remove: removePost, loading: loadingPosts } = usePosts()
  const { users, remove: removeUser, loading: loadingUsers } = useUsers()

  return (
    <div className="page-wrapper">
      <h1 className="mb-3">Adminpanel</h1>
      <Tabs defaultActiveKey="posts" className="mb-3">
        <Tab eventKey="posts" title="Inlägg">
          {loadingPosts ? (
            <p>Laddar inlägg...</p>
          ) : posts.length === 0 ? (
            <p>Inga inlägg.</p>
          ) : (
            <div className="d-grid gap-3">
              {posts.map(p => (
                <Card key={p.id} className="post-card">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-start">
                      <span>{p.title}</span>
                      <small className="text-muted">#{p.id}</small>
                    </Card.Title>
                    <Card.Text>{p.content}</Card.Text>
                    <div className="d-flex gap-2 flex-wrap">
                      <small><b>Kategori:</b> {p.category || 'Ingen'}</small>
                      <small><b>Kontakt:</b> {p.email || '-'}</small>
                      {p.createdAt && <small><b>Skapad:</b> {p.createdAt}</small>}
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      {p.id != null && (
                        <Button
                          as={Link}
                          to={`/edit/${p.id}`}
                          size="sm"
                          variant="primary"
                        >
                          Redigera
                        </Button>
                      )}
                      {p.id != null && (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => removePost(p.id!)}
                        >
                          Ta bort
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Tab>
        <Tab eventKey="users" title="Användare">
          {loadingUsers ? (
            <p>Laddar användare...</p>
          ) : users.length === 0 ? (
            <p>Inga användare.</p>
          ) : (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Förnamn</th>
                  <th>Efternamn</th>
                  <th>Roll</th>
                  <th>Skapad</th>
                  <th style={{ width: 140 }}>Åtgärder</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.email}</td>
                    <td>{u.firstName}</td>
                    <td>{u.lastName}</td>
                    <td>{u.role}</td>
                    <td>{u.created}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeUser(u.id)}
                        >
                          Ta bort
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
      </Tabs>
    </div>
  )
}

