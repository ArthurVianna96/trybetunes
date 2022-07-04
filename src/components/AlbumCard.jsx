import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    const { artistName, artworkUrl100, collectionId, collectionName } = album;
    return (
      <Link
        to={ `/album/${collectionId}` }
        className="album-card"
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img src={ artworkUrl100 } alt={ collectionName } />
        <div className="album-info">
          <h3>{ collectionName }</h3>
          <p>{ artistName }</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumCard;
