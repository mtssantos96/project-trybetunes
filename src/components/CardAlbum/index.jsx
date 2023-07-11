import React, { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

class CardAlbum extends Component {
  render() {
    const { artist, albums } = this.props;
    return (
      <div className={ styles.cardContaier }>
        <div className={ styles.artistSearch }>
          <p>
            {' '}
            Resultado de álbuns de:
            {' '}
            <strong>
              {artist}
            </strong>
          </p>
        </div>
        <div className={ styles.albums }>
          { albums.map(
            ({
              artistName,
              collectionId,
              collectionName,
              artworkUrl100,
            }) => (
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
                key={ collectionId }
                className={ styles.album }
              >
                <section className={ styles.songInfo }>
                  <div className={ styles.songImg }>
                    <img
                      src={ artworkUrl100 }
                      alt={ collectionName }
                    />
                  </div>
                  <div className={ styles.songText }>
                    <h3>{collectionName}</h3>
                    <p>{artistName}</p>
                  </div>
                </section>
              </Link>
            ),
          ) }
        </div>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artist: string.isRequired,
  albums: arrayOf(shape({})).isRequired,
};

export default CardAlbum;
