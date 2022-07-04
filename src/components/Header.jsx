import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';
import Logo from '../assets/logo.png';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading
          ? <Loading />
          : (
            <div className="container__header">
              <div className="logo-row">
                <img src={ Logo } alt="trybe tunes" />
                <div className="user-info">
                  <i className="fa-solid fa-circle-user" />
                  <p data-testid="header-user-name">{ user.name }</p>
                </div>
              </div>
              <nav>
                <NavLink
                  to="/search"
                  data-testid="link-to-search"
                  activeClassName="selected"
                >
                  Pesquisa
                </NavLink>
                <NavLink
                  to="/favorites"
                  data-testid="link-to-favorites"
                  activeClassName="selected"
                >
                  Favoritas
                </NavLink>
                <NavLink
                  to="/profile"
                  data-testid="link-to-profile"
                  activeClassName="selected"
                >
                  Perfil
                </NavLink>
              </nav>
            </div>)}
      </header>
    );
  }
}

export default Header;
