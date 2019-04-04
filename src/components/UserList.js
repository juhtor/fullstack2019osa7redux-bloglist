import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableRow } from 'semantic-ui-react'

const UserList = (props) => {
  // const users = props.store.getState().users
  // const filter = props.store.getState().filter

  return (
    // <div>
    //   <h2>users</h2>
    //   <ul>
    //     {props.users
    //       .map(user =>
    //         <li key={user.id}>
    //           <Link to={`/users/${user.id}`}>{user.username}</Link>
    //         </li>
    //       )}
    //   </ul>
    // </div>
    <div>
      <h2>users</h2>
      <Table striped celled>
        <Table.Body>
          {props.users
            .map(user =>
              <TableRow key={user.id}>
                <Table.Cell>
                  <Link to={`/users/${user.id}`} >{user.username}</Link>
                </Table.Cell>
                <Table.Cell>
                  {user.name}
                </Table.Cell>
              </TableRow>
            )}
        </Table.Body>
      </Table>
    </div>
  )
}

// const usersToShow = ({users, filter }) => {
//   return users.filter(user => user.content.indexOf(filter) > -1)
// }

const mapStateToProps = (state) => {
  return {
    users: state.users.sort((a, b) => a.blogs.length - b.blogs.length)
  }
}

const ConnectedUserList = connect(
  mapStateToProps
)(UserList)

export default ConnectedUserList