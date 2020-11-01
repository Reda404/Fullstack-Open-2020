import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('<Blog /> renders title and author by default but not url and likes', () => {
  const blog = {
    title: 'test',
    author: 'reda',
    url: 'aaa.com',
    likes: 74,
  }

  const renderedBlog = render(<Blog blog={blog} />)

  console.log(renderedBlog.container)

  expect(renderedBlog.container).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )
})
