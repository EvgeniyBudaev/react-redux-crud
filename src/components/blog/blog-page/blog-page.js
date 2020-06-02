import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../blog-list';
import { URL } from '../../urls/urls';
import * as classes from './blog-page.module.scss';

export const BlogPage = () => {
  return (
    <div className={classes.BlogPage}>
      <div className={classes.Container}>
        <div className={classes.BlogPageName}><span>Blog</span></div>
        <div className={classes.BtnAddPost}>
          <Link className={classes.LinkAddPost} to={URL.ADD_BLOG}>Add New Blog</Link>
        </div>
        <div>
          <h3>Published News</h3>
          <BlogList />
        </div>
      </div>
    </div>
  )
}