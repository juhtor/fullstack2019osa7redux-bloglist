export const setUser = (user) => (
  {
    type: 'SET_USER',
    data: user
  }
)
export const clearUser = () => (
  {
    type: 'CLEAR_USER',
  }
)

const reducer = (state = null, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return null
    default: return state
  }
}

export default reducer