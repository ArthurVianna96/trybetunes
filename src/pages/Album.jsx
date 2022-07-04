import React, { Component } from 'react';
import propTypes from 'prop-types';

import './Album.css';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      tracks: [],
      album: {},
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const { tracks, album } = await this.getAlbumData(id);
    this.setState({ isLoading: false, tracks, album });
  }

  async getAlbumData(id) {
    const album = await getMusics(id);
    return { tracks: album.slice(1),
      album: album[0],
    };
  }

  render() {
    const { isLoading, tracks, album } = this.state;
    const { artworkUrl100, collectionName, artistName } = album;
    return (
      <div data-testid="page-album">
        {isLoading
          ? <Loading />
          : (
            <>
              <Header />
              <div className="album-description">
                <div className="album-name">
                  <img src={ artworkUrl100 } alt={ collectionName } />
                  <div className="album-name-text">
                    <h3 data-testid="album-name">{collectionName}</h3>
                    <p data-testid="artist-name">{artistName}</p>
                  </div>
                </div>
                <div className="album-tracks">
                  {tracks.map((track) => (
                    <div key={ track.trackNumber } className="track">
                      <p>{track.trackName}</p>
                      <audio
                        data-testid="audio-component"
                        src={ track.previewUrl }
                        controls
                      >
                        <track kind="captions" />
                      </audio>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
      </div>);
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
