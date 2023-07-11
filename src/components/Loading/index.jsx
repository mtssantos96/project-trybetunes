import React, { Component } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import styles from './style.module.css';

class Loading extends Component {
  render() {
    return (
      <div className={ styles.loadContainer }>
        <BiLoaderAlt />
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
