import { useParams } from "react-router-dom"
import PropTypes from "prop-types"

const SingleAnecdote = ({anecdote}) => {
 const id = useParams().id
 const findAnecdote = anecdote.find(n => n.id === Number(id))
  return(
    <>
      <strong>{findAnecdote.content}</strong>
      <div>has {findAnecdote.votes} votes</div>
      <a href={findAnecdote.info} target='__blank'>for more info see {findAnecdote.info}</a>
    </>
  )
}

SingleAnecdote.propTypes = {
  anecdote: PropTypes.func.isRequired,
};

export default SingleAnecdote