import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const Navigation = ({handleLogout}) => {
    const user = useSelector(state => state.user)
    console.log(user)

    const mystyle = {
      color: "white",
      backgroundColor: "gray",
      display:"flex",
      gap: '5px 10px',
      padding: "10px",
      fontFamily: "Arial"
    };

    return(
        <>
            <nav style={mystyle}>
                <Link to={'/blogs'}>blogs</Link>
                <Link to={'/users'}>users</Link>
                <div>{user.username} logged in</div>
                <button onClick={handleLogout}>logout</button>
            </nav>
        </>
    )
}
export default Navigation