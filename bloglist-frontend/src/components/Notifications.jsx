import { useSelector } from 'react-redux'

const BlogNotification = () => {
  const notification = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (!notification) {
    return null
  }

  return <div style={style}>{notification}</div>
}

export default BlogNotification
