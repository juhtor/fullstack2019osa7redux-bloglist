import React from 'react'
import { connect } from 'react-redux'
import BlogList from './BlogList'

const User = (props) => {
  if (props.user === undefined || props.blogs === undefined) {
    return null
  }

  return (
    <div>
      {props.user.name} aka {props.user.username}
      <br />
      <BlogList filteredBlogs={props.blogs.filter(blog => blog.user.id === props.user.id).map(blog => blog)} />
    </div>
  )
}

const mapStateToProps = (state) => (
  {
    blogs: state.blogs,
  }
)

export default connect(mapStateToProps)(User)