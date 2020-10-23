const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')

const initialBlogs = [
  {
    title: 'test1',
    author: 'reda404',
    url: 'http://localhost:3001',
    likes: 18,
  },
  {
    title: 'test2',
    author: 'reda404',
    url: 'http://localhost:3001',
    likes: 22,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('Correct amout of blogs is returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Blog is created', async () => {
  const newBlog = {
    title: 'test3',
    author: 'reda404',
    url: 'http://localhost:3001',
    likes: 8,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)

  const titles = response.body.map((r) => r.title)

  expect(titles).toContain('test3')
})

afterAll(() => {
  mongoose.connection.close()
})
