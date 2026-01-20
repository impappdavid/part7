const Notifications = ({ message }) => {
  if (!message) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    color: 'green'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}




export default Notifications