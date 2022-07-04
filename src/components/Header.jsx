import React, { Component } from 'react';

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
        {isLoading ? <Loading /> : <p data-testid="header-user-name">{ user.name }</p>}
      </header>
    );
  }
}

export default Header;
