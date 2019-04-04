import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
// import { useField } from './hooks'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, clearUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Link//, Redirect, withRouter
} from 'react-router-dom'
import User from './components/User'
import UserList from './components/UserList'

// import { Navbar, Nav } from 'react-bootstrap'

const App = (props) => {
  useEffect(() => {
    if (props.user !== undefined) {
      blogService.getAll().then(blogs => {
        props.initializeBlogs(blogs)
      })
      userService.getAll().then(users => {
        props.initializeUsers(users)
      })
    }
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      if (user !== null && user !== undefined && user.length > 0) {
        blogService.setToken(user.token)
      }
    }
  }, [])
  const userById = (id) => {
    return props.users.find(user => user.id === id)
  }
  const blogById = (id) => {
    console.log('find blog', id, 'from', props.blogs)
    return props.blogs.find(blog => blog.id === id)
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    props.clearUser()
    blogService.setToken(null)
    window.localStorage.setItem('loggedBlogappUser', null)
  }

  if (props.user === null || props.user === undefined) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  const Header = () => (
    <div className='header'>
      <Link id='homeLink' to='/'>home</Link>
      <Link id='blogsLink' to='/blogs'>blogs</Link>
      <Link id='usersLink' to='/users'>users</Link>
      {props.user.username} logged in <button onClick={handleLogout}>logout</button >
    </div>
  )

  // const Navigation = () => (
  //   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //     <Navbar.Collapse id="responsive-navbar-nav">
  //       <Nav className="mr-auto">
  //         <Nav.Link href="#" as="span">
  //           <Link to="/notes">notes</Link>
  //         </Nav.Link>
  //         <Nav.Link href="#" as="span">
  //           <Link to="/users">users</Link>
  //         </Nav.Link>
  //         <Nav.Link href="#" as="span">
  //           {props.user
  //             ? <em>{props.user} logged in</em>
  //             : <Link to="/">login</Link>
  //           }
  //         </Nav.Link>
  //       </Nav>
  //     </Navbar.Collapse>
  //   </Navbar>
  // )

  const Home = () => (
    <div>

      <h2>Blog react redux app</h2>
      <Notification />

      <UserList />
      <BlogList />
      <Togglable buttonLabel='add new blog'>
        <AddBlogForm />
      </Togglable>
    </div>
  )
  return (
    <div className='container'>
      <Router>
        <Header />

        <Route exact path="/users/" render={() =>
          <UserList />
        } />
        <Route exact path="/blogs/" render={() =>
          <BlogList />
        } />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />
        } />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog blog={blogById(match.params.id)} />
        } />
        <Route exact path="/" render={() =>
          <Home />
        } />
      </Router>
      <div>
        <br />
        <em>Redux blog app for mooc fullstack2019, Juho Taipale</em>
      </div>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users,
  }
}
const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  setUser,
  clearUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)