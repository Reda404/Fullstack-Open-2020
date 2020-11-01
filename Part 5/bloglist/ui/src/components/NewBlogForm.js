import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = {
    title,
    author,
    url,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          <label>author</label>
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          <label>url</label>
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        {/* <button style={{ display: 'block' }}>create</button> */}
        <button style={{ display: 'block' }}>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
