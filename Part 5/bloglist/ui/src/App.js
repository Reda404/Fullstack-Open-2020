import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const togglable = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = await loginService.login({ username, password })
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    localStorage.setItem('user', null)
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    blogService.setToken(user.token)
    await blogService.createOne(newBlog)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
    togglable.current.toggleVisibility()
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to app</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>username</label>
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </div>
          <div>
            <label>password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </div>
          <button>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <div>
          {`${user.name} logged in`}{' '}
          <button onClick={handleLogout}>logout</button>
        </div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      <Togglable buttonLabel="new note" ref={togglable}>
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
    </div>
  )
}

export default App
