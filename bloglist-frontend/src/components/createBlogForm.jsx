import { useState } from "react";
import { Form, Button } from 'react-bootstrap'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <Form onSubmit={handleCreateBlog}>
         <Form.Group>
           <Form.Label>title:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="write title here"
              onChange={({ target }) => setTitle(target.value)}
            />
         </Form.Group>
        <Form.Group>
            <Form.Label>author:</Form.Label>
            <Form.Control
              type="text"
              value={author}
              placeholder="write author here"
              onChange={({ target }) => setAuthor(target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
            <Form.Control
              type="text"
              value={url}
              placeholder="write url here"
              onChange={({ target }) => setUrl(target.value)}
            />
        </Form.Group>
        <Button type="submit">create</Button>
      </Form>
    </>
  );
};

export default CreateBlogForm;
