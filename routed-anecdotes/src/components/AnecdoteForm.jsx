import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { useField } from "../hooks";


const AnecdoteForm = ({ addNew, setNotification }) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setNotification(`a new anecdote ${content.value} created!`)
  
  setTimeout(() => {
    setNotification('')
  }, 5000)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

AnecdoteForm.propTypes = {
  addNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default AnecdoteForm