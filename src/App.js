import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };

    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn() {
    this.setState({ loggedIn: true });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Redirect to="/search" /> : <Login callback={ this.handleLogIn } />}
        </Route>
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="/*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
