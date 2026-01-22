import { useState } from 'react'
import blogService from '../services/blogs'

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
      <form onSubmit={handleAddComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="write a comment..."
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c.id || Math.random()}>{c.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments