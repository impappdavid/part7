import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import Comments from './Comments'
import {Button } from 'react-bootstrap'

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  
  const blog = useSelector(state => 
    state.blogs.find(b => b.id === id)
  )

  if (!blog) {
    return null
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url} target='_blank' rel="noreferrer">{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <Button onClick={handleLike}>like</Button>
      </div>
      <p>added by {blog.author}</p>

      <Comments blog={blog} />
    </div>
  )
}

export default BlogView