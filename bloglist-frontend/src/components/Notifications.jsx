import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const BlogNotification = () => {
  const notification = useSelector(state => state.notifications)

  if (!notification) {
    return null
  }

  return <Alert variant="success">{notification}</Alert>
}

export default BlogNotification
