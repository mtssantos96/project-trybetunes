import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';

import { getUser } from '../../services/userAPI';
import styles from './style.module.css';
import Loading from '../Loading/index';
import Logo from '../Logo/index';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userData = await getUser();
    this.setState({
      userInfo: userData,
      isLoading: false,
    });
  };

  getLinkClassName = (path) => {
    const { location } = this.props;
    const { pathname } = location;

    if (pathname.includes(path)) {
      return styles.linkActive;
    }

    return styles.link;
  };

  renderUserImage() {
    const {
      userInfo: { name, image },
    } = this.state;
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
    const {
      userInfo: { name },
      isLoading,
    } = this.state;

    return (
      <header data-testid="header-component" className={ styles.HeaderContainer }>
        {isLoading ? (
          <div className={ styles.loading }><Loading /></div>
        ) : (
          <>
            <div className={ styles.headerTop }>
              <div className={ styles.logo }>
                <Logo />
              </div>
              <div className={ styles.userInfo }>
                <Link to="/profile" className={ styles.linkImage }>
                  {this.renderUserImage()}
                </Link>
                <Link to="/profile" className={ styles.linkName }>
                  <p data-testid="header-user-name">{name}</p>
                </Link>
              </div>
            </div>
            <nav className={ styles.headerBotton }>
              <ul className={ styles.links }>
                <Link
                  data-testid="link-to-search"
                  to="/search"
                  className={ this.getLinkClassName('search') }
                >
                  <li>Busca</li>
                </Link>
                <Link
                  data-testid="link-to-favorites"
                  to="/favorites"
                  className={ this.getLinkClassName('favorites') }
                >
                  <li>Curtidas</li>
                </Link>
                <Link
                  data-testid="link-to-profile"
                  to="/profile"
                  className={ this.getLinkClassName('profile') }
                >
                  <li>Perfil</li>
                </Link>
              </ul>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default withRouter(Header);

Header.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
};
