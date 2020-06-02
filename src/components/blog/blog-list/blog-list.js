import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withApiService } from '../../hoc';
import { fetchBlogs } from '../../../redux/actions/blogs';
import { compose } from '../../utils';
import BlogListItem from '../blog-list-item';
import { ErrorIndicator } from '../../error/error-indicator';
import { Spinner } from '../../ui/spinner';
import * as classes from './blog-list.module.scss';

const BlogList = ({ blogs }) => {
  return (
    <ul className={classes.BlogList}>
      {
        blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <BlogListItem blog={blog} />
            </li>
          )
        })
      }
    </ul>
  )
};

class BlogListContainer extends Component {

  componentDidMount() {
    this.props.fetchBlogs();
  }

  render() {
    const { blogs, loading, error } = this.props.blogs;

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <ErrorIndicator />
    }
    
    return <BlogList blogs={blogs} />
  }
};

const mapStateToProps = ({ blogs, loading, error }) => {
  return { blogs, loading, error }
};

const mapDispatchToProps = (dispatch, { apiService }) => {
  return {
    fetchBlogs: fetchBlogs(apiService, dispatch)
  }
};

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BlogListContainer);