import React from 'react';
import * as classes from './image-preview.module.scss';

const ImagePreview = ({ img }) => {
  return (
    <div className={classes.ImagePreview}>
      <img src={img} className="img-thumbnail" alt="images"></img>
    </div>
  )
}

export default ImagePreview;