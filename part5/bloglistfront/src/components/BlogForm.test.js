import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {


    
  test('form calls the handler with right props', async () => {
    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<BlogForm createBlog={mockHandler} setErrorMessage={mockHandler2}/>)

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const sendButton = screen.getByText('create')

    await user.type(title, 'titteli')
    await user.type(author, 'kirjailija')
    await user.type(url, 'urli')

    await user.click(sendButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('titteli')
    expect(mockHandler.mock.calls[0][0].author).toBe('kirjailija')
    expect(mockHandler.mock.calls[0][0].url).toBe('urli')

  })
  
})