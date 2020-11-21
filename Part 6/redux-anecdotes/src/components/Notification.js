import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ display }) => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: display ? 'block' : 'none',
  }
  return <div style={style}>{notification}</div>
}

export default Notification
