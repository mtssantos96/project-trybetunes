import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Loading from '../../components/Loading/index';
import Logo from '../../components/Logo/index';
import { createUser } from '../../services/userAPI';
import styles from './style.module.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      isLoading: false,
      isLoginDisabled: true,
      isLoadingFinished: false,
    };
  }

  handleChange = ({ target }) => {
    const MIN_CHAR_LENGTH = 3;
    this.setState({
      username: target.value,
      isLoginDisabled: target.value.length < MIN_CHAR_LENGTH,
    });
  };

  loadUserInfo = async () => {
    const { username } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: username });
    this.setState({
      isLoading: false,
      isLoadingFinished: true,
    });
  };

  render() {
    const { isLoginDisabled, isLoading, isLoadingFinished } = this.state;
    if (isLoading) return <div className={ styles.loading }><Loading /></div>;
    return (
      <div className={ styles.loginContainer } data-testid="page-login">
        {isLoadingFinished && <Redirect to="/search" />}
        <div className={ styles.logo }>
          <Logo />
        </div>
        <form>
          <label htmlFor="name-input">
            <input
              id="name-input"
              type="text"
              placeholder="Nome"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isLoginDisabled }
            onClick={ this.loadUserInfo }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
