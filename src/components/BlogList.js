
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableRow } from 'semantic-ui-react'

const BlogList = (props) => {
  const blogs = (props.filteredBlogs === undefined ? props.blogs : props.filteredBlogs)
  return (
    <div>
      <h2>blogs</h2>
      <Table striped celled>
        <Table.Body>
          {blogs
            .map(blog =>
              <TableRow key={blog.id}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  {blog.user.username}
                </Table.Cell>
              </TableRow>
            )}
        </Table.Body>
      </Table>
    </div>
  )
}

// const blogsToShow = ({ blogs, filter }) => {
//   return blogs.filter(blog => blog.content.indexOf(filter) > -1)
// }

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const ConnectedBlogList = connect(
  mapStateToProps
)(BlogList)

export default ConnectedBlogList