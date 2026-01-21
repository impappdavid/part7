import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import "./index.css";
import LoginForm from "./components/loginForm";
import CreateBlogForm from "./components/createBlogForm";
import Togglable from "./components/Togglable";
import { useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { useSelector } from 'react-redux'
import { showNotification } from "./reducers/notificationReducer";
import BlogNotification from "./components/Notifications";
import { initializeUser, logoutUser } from "./reducers/userReducer";

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  
  const dispatch = useDispatch()

  const noteFormRef = useRef();

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);

  const createBlog = async (blogObject) => {
    try {
      await dispatch(addBlog(blogObject))
      dispatch(showNotification(`new anecdote '${blogObject.title}'`, 5))
    } catch (error) {
      dispatch(showNotification(`wrong credentials '${error.message}'`, 5))
    }
  };

  const handleLike = async (blog) => {

    try {
      dispatch(likeBlog(blog))
    } catch (error) {
      dispatch(showNotification(`Failed to update '${error.message}'`, 5))
    }
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))

        dispatch(showNotification(`you deleted the '${blog.title} blog'`, 5))
      } catch (exception) {
        const errorMsg =
          exception.response?.data?.error || "Failed to delete the blog";
        dispatch(showNotification(errorMsg, 5))
      }
    }
  };

  const showBlogs = () => {
    const handleLogout = () => {
      window.localStorage.removeItem("loggedBlogappUser");
      dispatch(logoutUser())
    };

    return (
      <>
        <h2>blogs</h2>
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable buttonLabel="create new blog" ref={noteFormRef}>
          <CreateBlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
      </>
    );
  };

  return (
    <div>
      
      {!user && (
        <LoginForm />
      )}
      <BlogNotification />
      {user && <div>{showBlogs()}</div>}
    </div>
  );
};

export default App;
