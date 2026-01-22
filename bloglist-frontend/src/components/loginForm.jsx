import { useState } from "react";
import { loginUser } from "../reducers/userReducer";
import { useDispatch } from 'react-redux'
import { showNotification } from "../reducers/notificationReducer";
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(username, password));
      
      setUsername("");
      setPassword("");
      dispatch(showNotification(`Welcome!`, 5));
    } catch (error) {
      dispatch(showNotification(`wrong username or password ${error.message}`, 5));
    }
  };

  return (
    <>
      <h2>log in to application</h2>
      <Form  onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
        </Form.Group>
        <Button variant="primary" type="submit">login</Button >
      </Form >
    </>
  );
};

export default LoginForm;
