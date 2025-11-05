import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export default function PostForm({ initial, onSubmit }: any) {
  const [title, setTitle] = useState(initial?.title || "")
  const [content, setContent] = useState(initial?.content || "")
  const [category, setCategory] = useState(initial?.category || "")
  const [email, setEmail] = useState(initial?.email || "")

  function handleSubmit(e: any) {
    e.preventDefault()
    onSubmit(title, content, category, email)
  }

  return (
    <Form onSubmit={handleSubmit} className="form-wrap">

      <Form.Group className="mb-3">
        <Form.Label>Titel</Form.Label>
        <Form.Control
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ange titel…"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Innehåll</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Skriv ditt meddelande…"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Kategori</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Välj kategori…</option>
          <option value="Meddelande">Meddelande</option>
          <option value="Påminnelse">Påminnelse</option>
          <option value="Event">Event</option>
          <option value="Info">Info</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Kontakt (email)</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="namn@email.com"
        />
      </Form.Group>

      <Button type="submit" variant="warning" className="w-100">
        Spara
      </Button>
    </Form>
  )
}
