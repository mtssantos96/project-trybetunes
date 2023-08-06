import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { getUser } from '../../services/userAPI';

import styles from './style.module.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      userInfo: { ...user },
      isLoading: false,
    });
  };

  renderUserImage(image, name) {
    const defaultUser = <BiUser />;

    if (image) {
      return (
        <img
          src={ image }
          alt={ `User ${name}` }
          className={ styles.userImage }
        />
      );
    }
    return defaultUser;
  }

  render() {
    const { userInfo, isLoading } = this.state;
    const { name, email, image, description } = userInfo;
    return (
      <div className={ styles.profilePage }>
        <Header />
        {isLoading ? (
          <div className={ styles.loading }><Loading /></div>
        ) : (

          <section
            data-testid="page-profile"
            className={ styles.profileContainer }
          >
            <div className={ styles.categoryHeader }><h2>Perfil</h2></div>
            <section className={ styles.profile }>
              <div
                className={ styles.profilePic }
              >
                {this.renderUserImage(image, name)}
              </div>
              <div className={ styles.profileInfo }>
                <div className={ styles.divInfo }>
                  { name ? <p className={ styles.titleInfo }>Nome</p> : '' }
                  <p className={ styles.name }>{name}</p>
                </div>
                <div className={ styles.divInfo }>
                  { email ? <p className={ styles.titleInfo }>E-mail</p> : '' }
                  <p className={ styles.email }>{email}</p>
                </div>
                <div className={ styles.divInfo }>
                  { description ? <p className={ styles.titleInfo }>Descrição</p> : '' }
                  <p className={ styles.description }>{description}</p>
                </div>
              </div>
              <Link to="/profile/edit" className={ styles.editProfile }>
                Editar perfil
              </Link>
            </section>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
