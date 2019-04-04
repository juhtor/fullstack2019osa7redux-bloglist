import React, { useState } from 'react'
import blogService from '../services/blogs'
import { addBlog } from '../reducers/blogReducer'
import { setErrorNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AddBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleAddBlog = (event) => {
    event.preventDefault()
    blogService.create({
      title: title,
      author: author,
      url: url
    }).then(newBlog => {
      props.addBlog(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
    })
      .catch(error => {
        props.setErrorNotification(error.response
          ? error.response.data.error : 'uknown error during like')
      })
  }
  return (
    <div>
      <form onSubmit={handleAddBlog}>
        title:
        <input id='titleInput'
          value={title}
          onChange={(event) => { setTitle(event.target.value) }} />
        <br />
        author:
        <input id='authorInput'
          value={author}
          onChange={(event) => { setAuthor(event.target.value) }} />        <br />
        url:
        <input id='urlInput'
          value={url}
          onChange={(event) => { setUrl(event.target.value) }} />        <br />
        <button id='addBlog' type='submit'>add</button>
      </form>
    </div>
  )
}
const setDispatchToProps = {
  addBlog,
  setErrorNotification
}

export default connect(null, setDispatchToProps)(AddBlogForm)
