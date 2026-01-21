import { useState } from "react";

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle} className="blog">
      {!visible ? (
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      ) : (
        <div className="blog-details">
          <p>
            {blog.title} <button onClick={toggleVisibility}>hide</button>
          </p>
          <p>{blog.url}</p>
          <p className="likes">
            likes {blog.likes}
            <button onClick={() => handleLike(blog)} className="likeButton">
              like
            </button>
          </p>
          <p>{blog.author}</p>

          { user && blog.user.username === user.username && (
            <button
              style={{ backgroundColor: "lightblue" }}
              onClick={() => handleRemove(blog)}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
