import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import Loading from '../../components/Loading/index';
import Logo from '../../components/Logo/index';
import { createUser } from '../../services/userAPI';
import styles from './style.module.css';

const minLength = 3;
const loginSchema = Yup.object().shape({
  username: Yup.string().min(minLength).required(),
});

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
    this.setState({
      username: target.value,
      isLoginDisabled: target.value.length < minLength,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = this.state;
    this.setState({ isLoading: true });

    try {
      await loginSchema.validate({ username }, { abortEarly: false });
      await createUser({ name: username });
      this.setState({
        isLoading: false,
        isLoadingFinished: true,
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
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
        <form onSubmit={ this.handleSubmit }>
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
            type="submit"
            data-testid="login-submit-button"
            disabled={ isLoginDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
