import { useNavigate } from "react-router-dom"
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

  const handleReset = () => {
  content.resetfield()
  author.resetfield()
  info.resetfield()
}

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...info.input} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default AnecdoteForm