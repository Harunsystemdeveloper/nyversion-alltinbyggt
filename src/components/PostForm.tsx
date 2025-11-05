import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export default function PostForm({ initial, onSubmit }: any) {
  const [title, setTitle] = useState(initial?.title || '')
  const [content, setContent] = useState(initial?.content || '')

   function handleSubmit(e: any) {
    e.preventDefault()
    onSubmit(title, content)
  }

  return (
    <Form onSubmit={handleSubmit} className="form-wrap">
      <Form.Group className="mb-3">
        <Form.Label>Titel</Form.Label>
        <Form.Control
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ange titel..."
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Innehåll</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Skriv ditt meddelande..."
        />
      </Form.Group>

      <div className="d-grid">
        <Button type="submit" variant="primary">Spara</Button>
      </div>
    </Form>
  )
}