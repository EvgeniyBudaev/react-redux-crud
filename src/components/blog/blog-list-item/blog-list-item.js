import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withApiService } from '../../hoc';
import { URL } from '../../urls/urls';
import { deleteBlog } from '../../../redux/actions/blogs';
import * as classes from './blog-list-item.module.scss';

const BlogListItem = (props) => {
  const { title, img, id } = props.blog;
  const { apiService } = props;

  return (
    <Fragment>
      <div className={classes['blog-card']}>
        <div className={classes.meta}>
          <div className={classes.photo}>
            <img src={img} alt={title}></img>
          </div>
        </div>
        <div className={classes.description}>
          <h1>{title}</h1>
          <p className={classes['read-more']}>
            <Link to={`${URL.HOME}${URL.EDIT_BLOG}${id}`}>Edit</Link>
          </p>
          <button className="btn btn-danger btn-xs" onClick={() => props.deleteBlog(id, apiService)}>Delete</button>
        </div>
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = {
  deleteBlog
}

export default compose(
  withApiService(),
  connect(null, mapDispatchToProps)
)(withRouter(BlogListItem))