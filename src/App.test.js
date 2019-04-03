import React from 'react'
import {
  render, waitForElement
} from 'react-testing-library'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

jest.mock('./services/blogs')

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    let component = null
    localStorage.setItem('loggedBlogappUser', null)
    component = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    component.rerender(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await waitForElement(
      () => component.getByText('login')
    )
    expect(component.container).toHaveTextContent(
      'login'
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })
})
describe('<App />', () => {
  it('user is logged in and blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    let component = null
    component = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    component.rerender(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await waitForElement(
      () => component.getByText('logout')
    )
    expect(component.container).toHaveTextContent(
      'logout'
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)
  })
})