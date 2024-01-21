import { useState } from 'react'

const Blog = ({ blog, addLike, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const iscreator = { display: (user.id === blog.user.id) ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style = {blogStyle} className='blog'>
      <div style={hideWhenVisible} className='short'>
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility} className='view'>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className='long'>
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}  <button onClick = {() => addLike(blog)} id = 'likebutton'>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style = {iscreator}>
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog