import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => 
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlogLocally(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlogLocally } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const objectToUpdate = {...blog, likes: blog.likes + 1}
    const updatedBlog = await blogService.update(blog.id, objectToUpdate)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlogLocally(id))
  }
}

export default blogSlice.reducer