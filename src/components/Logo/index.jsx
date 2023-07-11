import React, { Component } from 'react';
import { BiMusic } from 'react-icons/bi';
import styles from './style.module.css';

class Logo extends Component {
  render() {
    return (
      <div className={ styles.logoContainer }>
        <BiMusic />
        <h1>TrybeTunes</h1>
      </div>
    );
  }
}

export default Logo;
