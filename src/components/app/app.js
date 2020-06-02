import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "normalize.css";
import { BlogPage } from '../blog/blog-page';
import AddBlog from '../blog/add-blog';
import { EditBlog } from '../blog/edit-blog';
import { URL } from '../urls/urls';
import * as classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.Container}>
      <Switch>
        <Route path="/editBlog/:id" exact>
          <EditBlog />
        </Route>
        <Route path={URL.ADD_BLOG} exact>
          <AddBlog />
        </Route>
        <Route path={URL.HOME} exact>
          <BlogPage />
        </Route>
      </Switch>
    </div>
  )
}

export default App;