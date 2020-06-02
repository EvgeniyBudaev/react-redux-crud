import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { URL } from "../../urls/urls";
import { ApiService } from '../../../api/api-service';
import { editBlog } from '../../../redux/actions/blogs';
import { Spinner } from '../../ui/spinner';
import * as classes from './edit-blog.module.scss';

const apiService = new ApiService();

class EditBlogWrapper extends Component {
  state = {
    title: this.props.blog.title,
    img: '',
    blog: ''
  }

  changeInputHandler = event => {
    event.persist();
    this.setState(prev => ({
      ...prev, ...{
        [event.target.name]: event.target.value
      }
    }))
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      fetch(`https://react-redux-tutorial-feccd.firebaseio.com/blogs/${id}.json`)
        .then(res => res.json())
        .then(blog => this.setState({
          blog: blog
        }));
    }
  }

  submitHandler = async event => {
    event.preventDefault()
    const { title } = this.state;
    const blog = {
      title,
      img: ''
    }

    try {
      await apiService.editBlog(this.props.match.params.id, blog);
      this.props.editBlog(this.props.match.params.id, blog);
      this.setState({
        title: ''
      });
      console.log('[edit-blog][this.props.history] ', this.props.history)
      this.props.history.push(URL.HOME)
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { blog } = this.props;

    const renderLoading = <Spinner />

    const renderComponent = () => {
      if (!blog) return null;
    
      return (
        <Fragment>
          <div className={classes.EditBlog}>
            <form onSubmit={this.submitHandler}>
              <div className={classes.ImgAndBtn}>
                <div className={classes.Images}>
                  <h3>Post</h3>
                </div>
                <div className={classes.BtnGroup}>
                  <div className={classes.BtnSubmit}>
                    <button className={classes.Submit} type="submit">Save</button>
                  </div>
                  <div className={classes.BtnGoBack}>
                    <Link className={classes.LinkGoBack} to={URL.HOME} >Go back</Link>
                  </div>
                </div>
              </div>

              <div className={classes.InputTitle}>
                <input
                  type="text"
                  id="title"
                  value={this.state.title}
                  name="title"
                  placeholder="Blog title"
                  className="form-control"
                  onChange={this.changeInputHandler}
                ></input>
              </div>
            </form>
          </div>
        </Fragment>
      )
    }

    return (
      <div className={classes.EditBlog}>
        {blog ? renderComponent() : renderLoading}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const blogIndex = state.blogs.blogs.findIndex(({ id }) => id === ownProps.match.params.id);
  const item = state.blogs.blogs[blogIndex];
  return {
    blog: item
  }
}

const mapDispatchToProps = {
  editBlog
}

export const EditBlog = withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBlogWrapper))