import React, { Component } from 'react';

import './Search.css';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target: { value } }) {
    this.setState({ searchQuery: value });
  }

  isInputValid(input) {
    const minInputLength = 2;
    return input.length < minInputLength;
  }

  render() {
    const { searchQuery } = this.state;
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
          >
            Pesquisar
          </button>
        </section>
      </div>);
  }
}

export default Search;
