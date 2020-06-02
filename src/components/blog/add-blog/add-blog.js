import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { URL } from '../../urls/urls';
import { ApiService } from '../../../api/api-service';
import { convertToBase64 } from '../../utils/base64';
import { createBlog } from '../../../redux/actions/blogs';
import ImagePreview from '../../ui/image-preview/image-preview';
import * as classes from './add-blog.module.scss';

const apiService = new ApiService();

class AddBlog extends Component {
  state = {
    title: '',
    uploadedImage: null,
    convertedImage: null,
    id: null
  }

/** @type {React.RefObject<HTMLInputElement} */
  fileRef = createRef(null)

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.uploadedImage !== this.state.uploadedImage) && (this.state.uploadedImage !== null)) {
      convertToBase64(this.state.uploadedImage)
      .then(convertedImg => this.setState({
        convertedImage: convertedImg 
      }))
    }
  }

  submitHandler = async event => {
    event.preventDefault()

    const { title } = this.state;

    const newBlog = {
      title,
      img: this.state.convertedImage,
      id: Date.now().toString()
    }

    try {
      await apiService.addBlog(newBlog);
      this.props.createBlog(newBlog);
      this.setState({ title: '' });
      this.props.history.push(URL.HOME)
    } catch (err) {
      console.log(err);
    }
  }

  changeInputHandler = event => {
    event.persist()
    this.setState(prev => ({
      ...prev, ...{
        [event.target.name]: event.target.value
      }
    }))
  }

  handleUploadFile = () => {
    this.fileRef.current.click()
  }

  onFileAdded = () => {
    const file = this.fileRef.current.files[0]
    if (file.type !== 'image/jpeg') return
    this.setState({
      uploadedImage: file,
      convertedImage: null
    })
  }

  render() {
    return (
      <div className={classes.AddBlog}>
        <form onSubmit={this.submitHandler}>
          <div className={classes.ImgAndBtn}>
            <div className={classes.Images}>
              <h3>Post</h3>

              <ImagePreview img={this.state.convertedImage} />

              <div>
                <input ref={this.fileRef} onChange={this.onFileAdded} type="file" style={{width: '0px', height: '0px', position: 'absolute', display: 'block', visibility: 'hidden'}}></input>
              </div>
            </div>

            <div className={classes.BtnGroup}>
              <div className={classes.BtnSubmit}>
                <button className={classes.Submit} type="submit">Publish</button>
              </div>
              <div className={classes.BtnGoBack}>
                <Link className={classes.LinkGoBack} to={URL.HOME} >Go to back</Link>
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

          <div className={classes.BtnImagesGroup}>
            <div className={classes.BtnImages}>
              <button className="btn btn-info" onClick={this.handleUploadFile}>
                Download images
              </button>
            </div>
            <div className={classes.BtnImages}>
              {this.state.convertedImage && <button className="btn btn-danger" onClick={() => {this.setState({uploadedImage:null, convertedImage: null})}}>Delete images</button>}
            </div>
          </div>
        
      </div>
    )
  }
}

const mapDispatchToProps = {
  createBlog
}

export default connect(null, mapDispatchToProps)(withRouter(AddBlog));
