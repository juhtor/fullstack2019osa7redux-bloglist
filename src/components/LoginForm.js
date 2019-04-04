import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setErrorNotification, clearNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = (event) => {
    event.preventDefault()
    loginService.login({
      username: username,
      password: password
    }).then(user => {
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.setUser(user)
    })
      .catch(error => {
        props.setErrorNotification(error.response
          ? error.response.data.error : 'unknown error during login')
        props.clearNotification()
      })
  }
  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  return (
    <div className='login'>
      <h2>Login to application</h2>
      <Form onSubmit={login}>
        <Form.Field>
          username:
          <input id='username'
            value={username}
            onChange={onUsernameChange} />
        </Form.Field>
        <Form.Field>
          password:
          <input id='password'
            value={password}
            onChange={onPasswordChange}
            type='password' />
        </Form.Field>
        <Button type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => (
  {
    user: state.user
  }
)
const mapDispatchToProps = {
  setUser,
  setErrorNotification,
  clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
