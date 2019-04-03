export const addBlog = (blog) => (
  {
    type: 'NEW_BLOG',
    data: blog
  }
)
export const updateBlog = (blog) => (
  {
    type: 'UPDATE_BLOG',
    data: blog
  }
)
export const removeBlog = (id) => (
  {
    type: 'REMOVE_BLOG',
    data: id
  }
)
export const initializeBlogs = (blogs) => (
  {
    type: 'GET_ALL_BLOGS',
    data: blogs
  }
)
// const initialState = blogsAtStart.map(text => asObject(text))

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data)
    // case 'LIKE_BLOG':
    //   const id = action.data
    //   return state
    //     .map(blog => blog.id !== id 
    //       ? blog : { ...blog, likes: blog.likes + 1 })
    //     .sort((a, b) => b.likes - a.likes)
    case 'GET_ALL_BLOGS':
      return action.data
    case 'REMOVE_BLOG':
      const id = action.data
      return state.filter(blog => blog.id !== id)
    default: return state
  }
}

export default reducer