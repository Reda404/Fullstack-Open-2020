import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div style={notificationStyle}>{message}</div>
}

const notificationStyle = {
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '20px',
  background: 'green',
  color: '#fff',
}

export default Notification
