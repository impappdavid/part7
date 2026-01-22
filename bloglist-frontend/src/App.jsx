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
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import UsersList from "./components/UserList";
import { initializeUsers } from './reducers/usersReducer'
import User from "./components/User";
import BlogView from "./components/BlogView";
import Navigation from "./components/Navigation";

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

  useEffect(() => {
  dispatch(initializeUsers())
}, [dispatch])

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

  const handleLogout = () => {
      window.localStorage.removeItem("loggedBlogappUser");
      dispatch(logoutUser())
    };

  const showBlogs = () => {
    

    return (
      <>
        
        <Togglable buttonLabel="create new blog" ref={noteFormRef}>
          <CreateBlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
          </Link>
        ))}
      </>
    );
  };

  

  return (
    <div className="container">
    <BlogNotification />
    
    {!user ? (
      <LoginForm />
    ) : (
      <div>
        <Navigation handleLogout={handleLogout}/>
        <h1 className="">Blog App</h1>
        <Routes>
          
          <Route path="/" element={showBlogs()} />
          
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </div>
    )}
  </div>
    
  );
};

export default App;
