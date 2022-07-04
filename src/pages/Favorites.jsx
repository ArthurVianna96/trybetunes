import React, { Component } from 'react';

import './Favorites.css';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, isLoading: false });
  }

  async removeTrackFromFavorites(track) {
    this.setState({ isLoading: true });
    await removeSong(track);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, isLoading: false });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div className="favorites-page" data-testid="page-favorites">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <section className="section__favorites">
              <h3>Músicas Favoritas</h3>
              {favoriteSongs.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  track={ song }
                  isSongFavorite
                  callback={ () => this.removeTrackFromFavorites(song) }
                  albumCover={ song.artworkUrl100 }
                />))}
            </section>
          )}
      </div>);
  }
}

export default Favorites;
