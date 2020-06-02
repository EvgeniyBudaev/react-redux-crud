import { FETCH_BLOGS_SUCCESS, FETCH_BLOGS_FAILURE, FETCH_BLOGS_REQUEST, CREATE_BLOG, EDIT_BLOG, DELETE_BLOG } from '../types/types';

const initialState = {
  blogs: [],
  loading: true,
  error: false
}

const deleteOrder = (state, payload, blogs) => {
  const idx = blogs.findIndex(blog => blog.id === payload.id)
  const newBlogs = [
    ...blogs.slice(0, idx),
    ...blogs.slice(idx + 1)
  ]
  return {
    ...state,
    blogs: newBlogs
  }
}

export const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return {
        blogs: [],
        loading: true,
        error: null
      };
    
    case FETCH_BLOGS_SUCCESS:
      return {
        blogs: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_BLOGS_FAILURE:
      return {
        blogs: [],
        loading: false,
        error: action.payload
      };
    
    case CREATE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload]
      }
    
    case EDIT_BLOG:
      const blogId = action.payload.id;
      const blog = state.blogs.find((blog) => blog.id === blogId);
      const itemIndex = state.blogs.findIndex(({ id }) => id === blogId);
      const item = state.blogs[itemIndex];
      let newBlog;
      if (item) {
        newBlog = {
          ...item,
          title: item.title
        };
      } else {
        newBlog = {
          id: blog.id,
          title: blog.title
        };
      }

      if (itemIndex < 0) {
        return {
          ...state,
          blogs: [
            ...state.blogs,
            newBlog
          ]
        }
      } else {
        return {
          ...state,
          blogs: [
            ...state.blogs.slice(0, itemIndex),
            newBlog,
            ...state.blogs.slice(itemIndex + 1)
          ]
        };
      }
    
    case DELETE_BLOG:
      const { blogs } = state;
      return deleteOrder(state, action.payload, blogs);

    default:
      return state;
  }
}