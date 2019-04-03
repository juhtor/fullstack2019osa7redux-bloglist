import React, { useState } from 'react'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import {
  clearNotification,
  setInfoNotification,
  setErrorNotification
} from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import blogService from '../services/blogs'

const Blog = (props) => {
  if (props.blog === undefined) {
    return null
  }
  const [comment, setComment] = useState('')
  const like = () => {
    blogService
      .update(props.blog.id,
        {
          likes: props.blog.likes + 1
        })
      .then(updatedBlog => {
        props.updateBlog(updatedBlog)
      })
      .catch(error => {
        props.setErrorNotification(error.response
          ? error.response.data.error : 'uknown error during like')
      })
  }
  const addComment = () => {
    blogService
      .comment(props.blog.id, { comment: comment })
      .then(updatedBlog => {
        props.updateBlog(updatedBlog)
        setComment('')
      })
      .catch(error => {
        props.setErrorNotification(error.response
          ? error.response.data.error : 'uknown error during like')
      })
  }

  return (
    <div>
      <h2>{props.blog.title}</h2>
      {props.blog.url}
      <br />
      {props.blog.likes} likes
      <button onClick={like}>like</button>
      <br />
      added by {props.blog.user.name}
      <br />
      <h2>comments</h2>
      <input value={comment}
        onChange={(event) => { setComment(event.target.value) }} />
      <button onClick={addComment}>add comment</button>
      <ul>
        {props.blog.comments
          .map(comment =>
            <li key={comment}>
              {comment}
            </li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => (
  {
    user: state.user,
    blogs: state.blogs
  }
)
const mapDispatchToProps = {
  clearNotification,
  setInfoNotification,
  setErrorNotification,
  removeBlog,
  updateBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)