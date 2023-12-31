const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')





blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})
  
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(request.user.id)


  const blog = new Blog({
    author: body.author,
    url: body.url,
    likes: body.likes,
    title: body.title,
    user: user.id
  })
  
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
 
})

blogsRouter.delete('/:id', async (request, response) => {

  const userid = request.user.id

  const blog = await Blog.findById(request.params.id)

  if (userid.toString()!== blog.user.toString()){
    return response.status(401).json({ error: 'wrong user' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    url: body.url,
    likes: body.likes,
    title: body.title
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})


module.exports = blogsRouter