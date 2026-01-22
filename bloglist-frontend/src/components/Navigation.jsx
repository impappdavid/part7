import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Button, Nav } from 'react-bootstrap'


const Navigation = ({handleLogout}) => {
    const user = useSelector(state => state.user)
    console.log(user)

    return(
        <>
            <Navbar className='d-flex gap-2'>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav.Link href="#" as="span">
                    <Link to={'/'}>blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                    <Link to={'/users'}>users</Link>
                    </Nav.Link>
                    <div>{user.username} logged in</div>
                    <Button onClick={handleLogout}>logout</Button>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
export default Navigation