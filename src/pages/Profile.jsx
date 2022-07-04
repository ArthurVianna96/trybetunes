import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, isLoading: false });
  }

  renderAvatar(image) {
    return (
      image ? <img src={ image } alt="user avatar" data-testid="profile-image" /> : (
        <i className="fa-solid fa-circle-user" />
      )
    );
  }

  render() {
    const { isLoading, user } = this.state;
    const { name, email, description, image } = user;
    return (
      <div className="profile-page" data-testid="page-profile">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <section className="section__profile">
              <div className="profile-fields">
                <div className="avatar-field">
                  {this.renderAvatar(image)}
                  <Link to="profile/edit" className="profile-edit">Editar perfil</Link>
                </div>
                <div className="profile-field">
                  <h4>Nome</h4>
                  <p>{name}</p>
                </div>
                <div className="profile-field">
                  <h4>E-mail</h4>
                  <p>{email}</p>
                </div>
                <div className="profile-field">
                  <h4>Descrição</h4>
                  <p>{description}</p>
                </div>
              </div>
            </section>
          )}
      </div>);
  }
}

export default Profile;
