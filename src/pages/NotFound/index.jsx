import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiBlock, BiArrowBack } from 'react-icons/bi';

import styles from './style.module.css';

class NotFound extends Component {
  render() {
    return (
      <div className={ styles.notFound }>
        <div>
          <BiBlock />
          <h1>404</h1>
        </div>
        <p>Página não encontrada.</p>
        <Link
          to="/search"
          data-testid="page-not-found"
          className={ styles.goBack }
        >
          <BiArrowBack />
          <p>Voltar ao início</p>
        </Link>
      </div>
    );
  }
}

export default NotFound;
