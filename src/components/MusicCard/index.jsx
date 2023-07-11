import { shape, func } from 'prop-types';
import { PiHeartFill, PiHeartBold } from 'react-icons/pi';
import React, { Component } from 'react';
import styles from './style.module.css';

class MusicCard extends Component {
  render() {
    const {
      music: { trackId, trackName, previewUrl },
      music,
      handleChange,
      favSongsChecked,
    } = this.props;
    return (
      <section key={ trackId } className={ styles.albumSong }>
        <div className={ styles.trackName }>
          <h3>{trackName}</h3>
        </div>
        <div className={ styles.audioAndFav }>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId }>
            <input
              id={ trackId }
              name={ trackId }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ !!favSongsChecked[trackId] }
              onChange={ (e) => handleChange(e, music) }
              className={ styles.favCheckbox }
            />
            {favSongsChecked[trackId] ? (
              <>
                <p>Favorita</p>
                <PiHeartFill className={ styles.heartFill } />
              </>
            ) : (
              <>
                <p>Favorita</p>
                <PiHeartBold className={ styles.heartBold } />
              </>
            )}
          </label>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: shape({}).isRequired,
  handleChange: func.isRequired,
  favSongsChecked: shape({}).isRequired,
};

export default MusicCard;
