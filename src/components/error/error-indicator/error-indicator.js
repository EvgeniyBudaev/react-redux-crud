import React from 'react';
import icon from './error-icon.png';
import * as classes from './error-indicator.module.scss';

export const ErrorIndicator = () => {
  return (
    <div className={classes.error_indicator}>
      <img className={classes.error_icon} src={icon} alt="error icon"></img>
      <span className={classes.boom}>Warning!</span>
      <span>Something went wrong</span>
    </div>
  )
}