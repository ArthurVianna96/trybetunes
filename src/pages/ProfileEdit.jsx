import React, { Component } from 'react';
import propTypes from 'prop-types';

import './ProfileEdit.css';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handlePageRedirect = this.handlePageRedirect.bind(this);
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, isLoading: false });
  }

  handleInputChange({ target: { name, value } }) {
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
  }

  async handleUserUpdate(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { user } = this.state;
    await updateUser(user);
    this.handlePageRedirect();
  }

  handlePageRedirect() {
    const { history } = this.props;
    history.push('/profile');
  }

  isInputValid() {
    const { user: { name, email, image, description } } = this.state;
    const inputsArray = [name, email, image, description];
    const isEmailValid = /\w+@\w+\.com/.test(email);
    const areInputsValid = inputsArray.every((input) => input !== '');
    return isEmailValid && areInputsValid;
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
    const { name, email, image, description } = user;
    const isButtonEnabled = this.isInputValid();
    return (
      <div className="profile-edit-page" data-testid="page-profile-edit">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <form className="section__profile-edit">
              <div className="profile-edit-fields">
                <div className="avatar-field">
                  {this.renderAvatar(image)}
                  <input
                    placeholder="link para sua imagem"
                    data-testid="edit-input-image"
                    name="image"
                    value={ image }
                    onChange={ this.handleInputChange }
                  />
                </div>
                <div className="profile-edit-field">
                  <h4>Nome</h4>
                  <p>Fique a vontade para usar seu nome social</p>
                  <input
                    placeholder="Nome"
                    data-testid="edit-input-name"
                    name="name"
                    value={ name }
                    onChange={ this.handleInputChange }
                  />
                </div>
                <div className="profile-edit-field">
                  <h4>E-mail</h4>
                  <p>Escolha um e-mail que consulta diariamente</p>
                  <input
                    data-testid="edit-input-email"
                    name="email"
                    placeholder="usuario@email.com"
                    value={ email }
                    onChange={ this.handleInputChange }
                  />
                </div>
                <div className="profile-edit-field">
                  <h4>Descrição</h4>
                  <textarea
                    data-testid="edit-input-description"
                    name="description"
                    placeholder="Sobre mim"
                    value={ description }
                    onChange={ this.handleInputChange }
                  />
                </div>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ !isButtonEnabled }
                  onClick={ this.handleUserUpdate }
                >
                  Salvar
                </button>
              </div>
            </form>
          )}
      </div>);
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
