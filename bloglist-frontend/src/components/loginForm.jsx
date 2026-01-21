import { useState } from "react";
import { loginUser } from "../reducers/userReducer";
import { useDispatch } from 'react-redux'
import { showNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Dispatch the thunk action. It handles the API call, 
      // localStorage, and setting the token automatically.
      await dispatch(loginUser(username, password));
      
      setUsername("");
      setPassword("");
      dispatch(showNotification(`Welcome!`, 5));
    } catch (error) {
      // If the loginService.login fails, it will catch here
      dispatch(showNotification(`wrong username or password ${error.message}`, 5));
    }
  };

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
