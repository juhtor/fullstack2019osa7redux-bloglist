export const initializeUsers = (users) => (
  {
    type: 'INITIALIZE_USERS',
    data: users
  }
)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_BLOG':
      const blog = action.data
      return state.map(user => blog.user.id === user.id
        ? {
          ...user,
          blogs: user.blogs.concat(blog.id)
        } : user)
    case 'INITIALIZE_USERS':
      return action.data
    default: return state
  }
}

export default reducer