import React, { Component } from 'react';

import './Search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      isLoading: false,
      albums: null,
      previousSearch: '',
      message: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleArtistSearch = this.handleArtistSearch.bind(this);
  }

  handleInputChange({ target: { value } }) {
    this.setState({ searchQuery: value });
  }

  async handleArtistSearch() {
    this.setState({ isLoading: true });
    const { searchQuery } = this.state;
    const albums = await searchAlbumsAPI(searchQuery);
    const message = albums.length > 0 ? '' : 'Nenhum álbum foi encontrado';
    this.setState({
      albums,
      previousSearch: searchQuery,
      searchQuery: '',
      isLoading: false,
      message,
    });
  }

  isInputValid(input) {
    const minInputLength = 2;
    return input.length < minInputLength;
  }

  render() {
    const { searchQuery, isLoading, albums, previousSearch, message } = this.state;
    const isButtonDisabled = this.isInputValid(searchQuery);
    return (
      <div data-testid="page-search">
        <Header />
        <section className="section__search">
          <div className="search-bar">
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Nome do artista"
              value={ searchQuery }
              onChange={ this.handleInputChange }
            />
            <i className="fa-solid fa-magnifying-glass" />
          </div>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleArtistSearch }
          >
            Pesquisar
          </button>
        </section>
        {isLoading ? <Loading />
          : (
            albums && (
              <section className="section__albums">
                <h2>
                  Resultado de álbuns de:
                  <span className="search-param"> {previousSearch}</span>
                </h2>
                <div className="container__albums">
                  {message && <p>{message}</p>}
                  {albums.map((album) => (
                    <AlbumCard key={ album.collectionId } album={ album } />))}
                </div>
              </section>)
          )}
      </div>);
  }
}

export default Search;
