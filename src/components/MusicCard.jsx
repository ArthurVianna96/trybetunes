import React, { Component } from 'react';
import propTypes from 'prop-types';

import './MusicCard.css';

class MusicCard extends Component {
  render() {
    const { track, isSongFavorite, callback, albumCover = null } = this.props;
    const { trackId, trackName, previewUrl, collectionName, artistName } = track;
    return (
      <div key={ trackId } className="track">
        <div className="track-name-favorite">
          {albumCover && <img src={ albumCover } alt="album cover" />}
          <div className="track-name">
            <h4>{trackName}</h4>
            {albumCover && (
              <>
                <p>{collectionName}</p>
                <p>{artistName}</p>
              </>
            )}
          </div>
          <div className="checkbox-container">
            {isSongFavorite
              ? <i className="fa-solid fa-heart" />
              : <i className="fa-regular fa-heart" />}
            <label htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                type="checkbox"
                checked={ isSongFavorite }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ () => callback(track) }
              />
            </label>
          </div>
        </div>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: propTypes.shape({
    trackId: propTypes.number.isRequired,
    trackName: propTypes.string.isRequired,
    previewUrl: propTypes.string.isRequired,
    collectionName: propTypes.string.isRequired,
    artistName: propTypes.string.isRequired,
  }).isRequired,
  isSongFavorite: propTypes.bool.isRequired,
  callback: propTypes.func.isRequired,
  albumCover: propTypes.string.isRequired,
};

export default MusicCard;
