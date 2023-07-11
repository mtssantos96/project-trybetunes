import React, { Component } from 'react';
import { BiHeadphone } from 'react-icons/bi';
import styles from './style.module.css';

class Logo extends Component {
  render() {
    return (
      <div className={ styles.logoContainer }>
        <div>
          <h1>trybe</h1>
          <BiHeadphone />
        </div>
        <p>tunes</p>
      </div>
    );
  }
}

export default Logo;
