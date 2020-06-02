import { FETCH_BLOGS_SUCCESS, FETCH_BLOGS_FAILURE, FETCH_BLOGS_REQUEST, CREATE_BLOG, EDIT_BLOG, DELETE_BLOG } from '../types/types';

const blogsLoaded = (newBlogs) => {
  return {
    type: FETCH_BLOGS_SUCCESS,
    payload: newBlogs
  };
};

const blogsRequested = () => {
  return {
    type: FETCH_BLOGS_REQUEST
  }
};

const blogsError = (error) => {
  return {
    type: FETCH_BLOGS_FAILURE,
    payload: error
  };
};

const createBlog = (blog) => {
  return {
    type: CREATE_BLOG,
    payload: blog
  }
}

const editBlog = (id, blog) => {
  return {
    type: EDIT_BLOG,
    payload: { id, blog}
  }
}

const deleteBlog = (blogId, apiService) => {
  // console.log('[action][blogId]', blogId, apiService)
  apiService.deleteBlog(blogId);
  return {
    type: DELETE_BLOG,
    payload: { id: blogId }
  }
}

const fetchBlogs = (apiService, dispatch) => () => {
  dispatch(blogsRequested());
  apiService.getBlogs()
    .then((data) => dispatch(blogsLoaded(data)))
    .catch((err) => dispatch(blogsError(err)));
}

export {
  fetchBlogs,
  createBlog,
  editBlog,
  deleteBlog
};