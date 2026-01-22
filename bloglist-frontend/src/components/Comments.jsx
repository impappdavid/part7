import { useState } from 'react'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(blog.comments || [])

  const handleAddComment = async (event) => {
    event.preventDefault()
    
    try {
      const returnedComment = await blogService.addComment(blog.id, { comment })
      setComments(comments.concat(returnedComment))
      setComment('')
    } catch (exception) {
      console.error('Failed to add comment', exception)
    }
  }

  return (
    <div>
      <h3>comments</h3>
      <Form onSubmit={handleAddComment}>
        <Form.Control
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="write a comment..."
        />
        <Button type="submit">add comment</Button>
      </Form>
      <ul>
        {comments.map((c) => (
          <li key={c.id || Math.random()}>{c.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments