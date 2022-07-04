import React, { Component } from 'react';
import propTypes from 'prop-types';

import './Album.css';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      tracks: [],
      album: {},
      favoriteSongs: [],
    };
    this.handleFavoriteTrack = this.handleFavoriteTrack.bind(this);
    this.checkIfSongIsFavorite = this.checkIfSongIsFavorite.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const { tracks, album } = await this.getAlbumData(id);
    const favoriteSongs = await this.getListOfFavoriteSongs();
    this.setState({ isLoading: false, tracks, album, favoriteSongs });
  }

  async handleFavoriteTrack(track) {
    const isSongAlreadyInFavorites = this.checkIfSongIsFavorite(track);
    this.setState({ isLoading: true });
    if (!isSongAlreadyInFavorites) {
      await addSong(track);
      const newFavoriteSongs = await this.getListOfFavoriteSongs();
      this.setState({ favoriteSongs: newFavoriteSongs });
    } else {
      await removeSong(track);
      const newFavoriteSongs = await this.getListOfFavoriteSongs();
      this.setState({ favoriteSongs: newFavoriteSongs });
    }
    this.setState({ isLoading: false });
  }

  async getListOfFavoriteSongs() {
    const favoriteSongs = await getFavoriteSongs();
    return favoriteSongs;
  }

  async getAlbumData(id) {
    const album = await getMusics(id);
    return { tracks: album.slice(1),
      album: album[0],
    };
  }

  checkIfSongIsFavorite(track) {
    const { favoriteSongs } = this.state;
    const isSongAlreadyFavorite = favoriteSongs.some((song) => (
      song.trackId === track.trackId));
    return isSongAlreadyFavorite;
  }

  renderSongs() {
    const { tracks } = this.state;
    return tracks.map((track) => {
      const isSongFavorite = this.checkIfSongIsFavorite(track);
      return (
        <div key={ track.trackId } className="track">
          <div className="track-name-favorite">
            <p>{track.trackName}</p>
            <div className="checkbox-container">
              {isSongFavorite
                ? <i className="fa-solid fa-heart" />
                : <i className="fa-regular fa-heart" />}
              <input
                type="checkbox"
                checked={ isSongFavorite }
                data-testid={ `checkbox-music-${track.trackId}` }
                onChange={ () => this.handleFavoriteTrack(track) }
              />
            </div>
          </div>
          <audio
            data-testid="audio-component"
            src={ track.previewUrl }
            controls
          >
            <track kind="captions" />
          </audio>
        </div>
      );
    });
  }

  render() {
    const { isLoading, album } = this.state;
    const { artworkUrl100, collectionName, artistName } = album;
    return (
      <div className="album-page" data-testid="page-album">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <div className="album-description">
              <div className="album-name">
                <img src={ artworkUrl100 } alt={ collectionName } />
                <div className="album-name-text">
                  <h3 data-testid="album-name">{collectionName}</h3>
                  <p data-testid="artist-name">{artistName}</p>
                </div>
              </div>
              <div className="album-tracks">
                {this.renderSongs()}
              </div>
            </div>
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
