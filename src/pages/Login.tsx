import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' // 🆕 Link import
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      await login(email, password)
      nav('/') 
    } catch {
      setError('Fel användarnamn eller lösenord')
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: 'auto', marginTop: '50px' }}
    >
      <h2 className="mb-4 text-center">Logga in</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>E-post</Form.Label>
        <Form.Control
          type="email"
          placeholder="exempel@domän.se"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lösenord</Form.Label>
        <Form.Control
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <div className="d-grid">
        <Button type="submit" variant="primary">
          Logga in
        </Button>
      </div>

      <p className="mt-3 text-center">
        Har du inget konto?{' '}
        <Link to="/register">Registrera dig här</Link> {}
      </p>
    </Form>
  )
}


