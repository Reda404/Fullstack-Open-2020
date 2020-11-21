import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    props.createAnecdote(content)
    props.displayMessage(`anecdote "${content}" has been created`, 5)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  displayMessage,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
