import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

    const user = {
        name: "jurokowski",
        id: "1"
    }
    const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: user
    }

  let container

  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    container = render(<Blog blog={blog} user = {user} addLike = {mockHandler}/>).container
  })
    
  test('renders title and author not url or likes', () => {

    const div = container.querySelector('.short')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(div).not.toHaveTextContent(`${blog.url}`)
    expect(div).not.toHaveTextContent('likes')
  })
  test('renders title, author, url and likes when view is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.long')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(div).toHaveTextContent(`${blog.url}`)
    expect(div).toHaveTextContent(`likes ${blog.likes}`)
  })
  test('handler called twice if like button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likebutton = screen.getByText('like')
    await user.click(likebutton)
    await user.click(likebutton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})