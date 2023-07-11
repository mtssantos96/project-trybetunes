import { shape } from 'prop-types';
import React, { Component } from 'react';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';

import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import getMusics from '../../services/musicsAPI';

import styles from './style.module.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: [],
      loadingFav: true,
      favSongsChecked: {},
      successfulLoading: false,
    };
  }

  componentDidMount() {
    this.loadSongs();
    this.loadFavoriteSongs();
  }

  handleChange = ({ target: { name, checked } }, song) => {
    this.setState(({ favSongsChecked }) => ({
      loadingFav: true,
      favSongsChecked: { ...favSongsChecked, [name]: checked },
    }), async () => {
      await this.addOrRemoveFav(checked, song);
      this.setState({ loadingFav: false });
    });
  };

  addOrRemoveFav = async (action, song) => {
    if (action) await addSong(song);
    if (!action) await removeSong(song);
  }

  loadSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      album: data,
      loadingFav: false,
      successfulLoading: true,
    });
  };

  loadFavoriteSongs = async () => {
    const favSongs = await getFavoriteSongs();
    favSongs.forEach(({ trackId }) => {
      this.setState(({ favSongsChecked }) => ({
        favSongsChecked: { ...favSongsChecked, [trackId]: true },
      }));
    });
  }

  render() {
    const { album, loadingFav, favSongsChecked, successfulLoading } = this.state;
    return (
      <div className={ styles.albumContainer }>
        <Header />
        <div data-testid="page-album" className={ styles.pageAlbum }>
          {successfulLoading && (
            <main className={ styles.album }>
              <div className={ styles.albumInfo }>
                <img src={ album[0].artworkUrl100 } alt="Album cover art" />
                <div>
                  <h2 data-testid="album-name">{album[0].collectionName}</h2>
                  <p data-testid="artist-name">{album[0].artistName}</p>
                </div>
              </div>
              <div className={ styles.songs }>
                {loadingFav ? <Loading /> : (
                  <>
                    {album.slice(1).map((song) => (
                      <MusicCard
                        key={ song.trackId }
                        music={ song }
                        handleChange={ this.handleChange }
                        favSongsChecked={ favSongsChecked }
                      />
                    ))}
                  </>
                )}
              </div>
            </main>
          )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: shape({}).isRequired,
};

export default Album;
