import PropTypes from 'prop-types';

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

Notifications.propTypes = {
  message: PropTypes.func.isRequired,
};


export default Notifications