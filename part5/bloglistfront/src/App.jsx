import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistappUser')
    blogService.setToken(null)
  }
  
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat({...returnedBlog, user}))
      })
  }

  const addLike = (oldBlog) => {
    const blogObject = {...oldBlog, likes: oldBlog.likes+1}
    blogService
      .update(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.filter(blog => blog.id !== oldBlog.id).concat({...returnedBlog, user: oldBlog.user}))
      })
  }

  const removeBlog = (id) => {
    blogService
      .deleteBlog(id).then( () => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />

        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>{user.name} logged in <button onClick = {logout}>log out</button></p>
      <Togglable buttonLabel = 'create new blog' ref = {blogFormRef}>
        <BlogForm createBlog={addBlog} setErrorMessage={setErrorMessage}/>
      </Togglable>
      {blogs.toSorted((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} addLike = {addLike} user = {user} removeBlog = {removeBlog}/>
      )}
    </div>
  )
}

export default App