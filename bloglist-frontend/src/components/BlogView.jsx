import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

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
        <button onClick={handleLike}>like</button>
      </div>
      <p>added by {blog.author}</p>
    </div>
  )
}

export default BlogView