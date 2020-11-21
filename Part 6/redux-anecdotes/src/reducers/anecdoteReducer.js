import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export const upvoteAnecdote = ({ content, id, votes }) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      content,
      id,
      votes: votes + 1,
    }

    const data = await anecdoteService.upvoteOne(id, updatedAnecdote)

    dispatch({
      type: 'VOTE',
      id: data.id,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content,
      id: getId(),
      votes: 0,
    }

    const data = await anecdoteService.createOne(newAnecdote)

    dispatch({
      type: 'CREATE',
      data,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data

    case 'VOTE':
      const anecdote = state.find((annecdote) => annecdote.id === action.id)

      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      }

      return state.map((anecdote) => {
        return anecdote.id !== action.id ? anecdote : updatedAnecdote
      })

    case 'CREATE':
      return [...state, action.data]

    default:
      return state
  }
}

export default reducer
