let timeoutID

export const displayMessage = (message, second) => {
  return (dispatch) => {
    dispatch({
      type: 'DISPLAY',
      message,
    })

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'HIDE',
        message,
      })
    }, second * 1000)
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'DISPLAY':
      return action.message
    case 'HIDE':
      return ''
    default:
      return state
  }
}

export default reducer
