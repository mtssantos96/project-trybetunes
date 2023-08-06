import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import * as Yup from 'yup';
import { BiUser, BiCheckCircle, BiXCircle } from 'react-icons/bi';

import Loading from '../../components/Loading';
import { getUser, updateUser } from '../../services/userAPI';
import Header from '../../components/Header';

import styles from './style.module.css';

const minLength = 3;
const nameLength = 32;
const descriptionLength = 120;
const imageUrlLength = 255;
const emailValidate = Yup.string().email().required();
const nameValidate = Yup.string().min(minLength).max(nameLength).required();
const descriptionValidate = Yup.string()
  .min(minLength).max(descriptionLength).required();
const imageUrlValidate = Yup.string().url()
  .min(minLength).max(imageUrlLength)
  .required();

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      userInformations: {},
      isLoading: false,
      validationStatus: {
        emailInput: true,
        nameInput: true,
        descriptionInput: true,
        imageInput: true,
      },
      isSaveButtonDisabled: false,
    };
  }

  componentDidMount() { this.fetchUser(); }

  validateInput = async (name, value) => {
    try {
      switch (name) {
      case 'email': await emailValidate.validate(value); break;
      case 'name': await nameValidate.validate(value); break;
      case 'description': await descriptionValidate.validate(value); break;
      case 'image': await imageUrlValidate.validate(value); break;
      default: break;
      }

      this.setState((prevState) => ({
        validationStatus: {
          ...prevState.validationStatus,
          [`${name}Input`]: true,
        },
      }), () => this.checkFormValidity());
    } catch (error) {
      this.setState((prevState) => ({
        validationStatus: {
          ...prevState.validationStatus,
          [`${name}Input`]: false,
        },
      }), () => this.checkFormValidity());
    }
  };

  checkFormValidity = () => {
    const { validationStatus } = this.state;
    const isSaveButtonDisabled = Object
      .values(validationStatus).some((status) => status === false);
    this.setState({ isSaveButtonDisabled });
  };

  handleChange = (event) => {
    if (event) {
      const { name, value } = event.target;
      this.setState(
        (prevState) => ({
          userInformations: { ...prevState.userInformations, [name]: value },
        }),
        () => this.validateInput(name, value),
      );
    }
  };

  fetchUser = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState(
      { userInformations: { ...user }, isLoading: false }, () => this.validateAllInputs(),
    );
  }

  validateAllInputs = () => {
    const { userInformations } = this.state;
    Object.keys(userInformations).forEach((key) => {
      this.validateInput(key, userInformations[key]);
    });
  };

  updateProfileInfo = async (event) => {
    event.preventDefault();
    const { userInformations } = this.state;
    this.setState({ isLoading: true });
    await updateUser(userInformations);
    this.redirectToProfile();
  };

  redirectToProfile = () => {
    const { history: { push } } = this.props;
    push('/profile');
  };

  renderUserImage(image, name) {
    const defaultUser = <BiUser />;
    if (image) {
      return (
        <img
          data-testid="profile-image"
          src={ image }
          alt={ `User ${name}` }
          className={ styles.userImage }
        />
      );
    }
    return defaultUser;
  }

  render() {
    const { userInformations, isLoading, validationStatus, isSaveButtonDisabled } = this
      .state;
    const { name, email, description, image } = userInformations;
    return (
      <div className={ styles.profilePage }>
        <Header />
        {isLoading
          ? <div className={ styles.loading }><Loading /></div>
          : (
            <section
              data-testid="page-profile-edit"
              className={ styles.profileContainer }
            >
              <div className={ styles.categoryHeader }><h2>Editar perfil</h2></div>
              <div className={ styles.profile }>
                <div className={ styles.imgProfileContainer }>
                  <label htmlFor="edit-image" className={ styles.editImage }>
                    <input
                      id="edit-image"
                      name="image"
                      placeholder="Insira um link"
                      value={ image }
                      onChange={ this.handleChange }
                      data-testid="edit-input-image"
                    />
                    {validationStatus.imageInput
                      ? <BiCheckCircle className={ styles.validIcon } />
                      : <BiXCircle className={ styles.invalidIcon } /> }
                  </label>
                  <div className={ styles.profilePic }>
                    {this.renderUserImage(image, name)}
                  </div>
                </div>
                <form className={ styles.profileForm }>
                  <label htmlFor="edit-name" className={ styles.editName }>
                    Nome
                    <input
                      id="edit-name"
                      name="name"
                      placeholder="Nome"
                      value={ name }
                      onChange={ this.handleChange }
                      data-testid="edit-input-name"
                    />
                    {validationStatus.nameInput
                      ? <BiCheckCircle className={ styles.validIcon } />
                      : <BiXCircle className={ styles.invalidIcon } /> }
                  </label>
                  <label htmlFor="edit-email" className={ styles.editEmail }>
                    Email
                    <input
                      id="edit-email"
                      name="email"
                      placeholder="usuario@email.com"
                      value={ email }
                      onChange={ this.handleChange }
                      data-testid="edit-input-email"
                    />
                    {validationStatus.emailInput
                      ? <BiCheckCircle className={ styles.validIcon } />
                      : <BiXCircle className={ styles.invalidIcon } /> }
                  </label>
                  <label htmlFor="edit-description" className={ styles.editDescription }>
                    Descrição
                    <input
                      id="edit-description"
                      name="description"
                      placeholder="Sobre mim"
                      value={ description }
                      onChange={ this.handleChange }
                      data-testid="edit-input-description"
                    />
                    {validationStatus.descriptionInput
                      ? <BiCheckCircle className={ styles.validIcon } />
                      : <BiXCircle className={ styles.invalidIcon } /> }
                  </label>
                  {isSaveButtonDisabled
                    ? (<p className={ styles.alert }>Preencha todos os campos</p>) : ('')}
                  <button
                    type="button"
                    disabled={ isSaveButtonDisabled }
                    onClick={ this.updateProfileInfo }
                    data-testid="edit-button-save"
                  >
                    Salvar
                  </button>
                </form>
              </div>
            </section>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: shape({ push: func }).isRequired,
};
