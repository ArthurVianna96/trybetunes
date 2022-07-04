import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { track, isSongFavorite, callback } = this.props;
    const { trackId, trackName, previewUrl } = track;
    return (
      <div key={ trackId } className="track">
        <div className="track-name-favorite">
          <p>{trackName}</p>
          <div className="checkbox-container">
            {isSongFavorite
              ? <i className="fa-solid fa-heart" />
              : <i className="fa-regular fa-heart" />}
            <input
              type="checkbox"
              checked={ isSongFavorite }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ () => callback(track) }
            />
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
  }).isRequired,
  isSongFavorite: propTypes.bool.isRequired,
  callback: propTypes.func.isRequired,
};

export default MusicCard;
