

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 4,
    border: "solid",
    borderWidth: 1,
    marginBottom: 2,
  };



  return (
    <div style={blogStyle} className="blog">
      
        <div className="blog-details">
          <p>
            {blog.title} 
          </p>
          
        </div>
    </div>
  );
};

export default Blog;
