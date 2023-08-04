import React, { Component } from 'react';
import { BiSearch } from 'react-icons/bi';
import * as Yup from 'yup';

import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading';
import CardAlbum from '../../components/CardAlbum';
import Header from '../../components/Header';
import styles from './style.module.css';

const minLength = 3;
const searchSchema = Yup.object().shape({
  userSearch: Yup.string().min(minLength).required(),
});

class Search extends Component {
  constructor() {
    super();
    this.state = {
      userSearch: '',
      artist: '',
      artistAlbums: [],
      isLoading: false,
      artistFound: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      userSearch: target.value,
    });
  };

  handleSearch = async () => {
    const { userSearch } = this.state;
    this.setState(
      {
        artist: userSearch,
        isLoading: true,
        userSearch: '',
      },
      async () => {
        const { artist } = this.state;
        this.setState({
          isLoading: false,
          artistFound: true,
          artistAlbums: await searchAlbumsAPI(artist),
        });
      },
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userSearch } = this.state;

    try {
      await searchSchema.validate({ userSearch }, { abortEarly: false });
      this.handleSearch();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { userSearch, artist, artistAlbums, artistFound, isLoading } = this.state;
    if (isLoading) return <div className={ styles.loading }><Loading /></div>;
    return (
      <div className={ styles.searchPage }>
        <Header />
        <section data-testid="page-search" className={ styles.searchContaier }>
          <form
            className={ styles.searchForm }
            role="search"
            onSubmit={ this.handleSubmit }
          >
            <label htmlFor="search-artist">
              <input
                type="text"
                id="search-artist"
                placeholder="Artistas"
                data-testid="search-artist-input"
                value={ userSearch }
                onChange={ this.handleChange }
              />
              <BiSearch />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ userSearch.length < minLength }
            >
              Buscar
            </button>
          </form>
          {artistFound && (
            <main className={ styles.albumsList }>
              {artistAlbums.length > 0 ? (
                <CardAlbum artist={ artist } albums={ artistAlbums } />
              ) : (
                <p className={ styles.albumNotFound }>Nenhum álbum foi encontrado</p>
              )}
            </main>
          )}
        </section>
      </div>
    );
  }
}

export default Search;
