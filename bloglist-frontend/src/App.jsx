import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './index.css'
import LoginForm from './components/loginForm'
import CreateBlogForm from './components/createBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()
  

  useEffect(()  =>  {
    if(user){
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const SuccessNotification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="success">
            {message}
        </div>
    )
}

const ErrorNotification = ({ errorMessage }) => {
    if (errorMessage === null) {
        return null
    }
    return (
        <div className="error">
            {errorMessage}
        </div>
    )
}

const addBlog = async (blogObject) => {
  try {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author}`)
  } catch (error) {
    setTimeout(() => {
      setErrorMessage('wrong credentials', error.message)
        setErrorMessage(null)
        setSuccessMessage(null)
      }, 5000)
  }
}

const handleLike = async (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.id || blog.user 
  }

  try {
    const returnedBlog = await blogService.update(blog.id, updatedBlog)

    const newBlogList = blogs.map(b => b.id !== blog.id ? b : returnedBlog)

    const sortedBlogs = newBlogList.sort((a, b) => b.likes - a.likes)

    setBlogs(sortedBlogs)
  } catch (error) {
    setErrorMessage('Failed to update likes', error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

const handleRemove = async (blog) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
    try {
      await blogService.remove(blog.id)

      setBlogs(blogs.filter(b => b.id !== blog.id))
      
      setSuccessMessage(`Deleted blog: ${blog.title}`)
      setTimeout(() => setSuccessMessage(null), 5000)
      
    } catch (exception) {
      const errorMsg = exception.response?.data?.error || 'Failed to delete the blog'
      setErrorMessage(errorMsg)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
}

  

  const showBlogs = () => {

    const handleLogout = () => {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }

    return(
     <>
      <h2>blogs</h2>
      <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
      <CreateBlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            handleLike={handleLike} 
            handleRemove={handleRemove}
            user={user}
  />
        )}
      </>
    )
  }
  

  return (
    <div>
      {errorMessage && <ErrorNotification errorMessage={errorMessage} />}
      {successMessage && <SuccessNotification message={successMessage} />}
      {!user && <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />}
      {user && (
      <div>
        
        {showBlogs()}
      </div>
    )}
      
    </div>
  )
}

export default App