export const setInfoNotification = (message) => (
  {
    type: 'NEW_NOTIFICATION',
    data: {
      message,
      type: 'info'
    }
  }
)
export const setErrorNotification = (message) => (
  {
    type: 'NEW_NOTIFICATION',
    data: {
      message,
      type: 'error'
    }
  }
)

export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION',
  }
)

const reducer = (state = '', action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default: return state
  }
}

export default reducer