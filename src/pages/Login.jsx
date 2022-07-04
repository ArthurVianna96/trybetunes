import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isLoading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserCreation = this.handleUserCreation.bind(this);
  }

  handleInputChange({ target: { value } }) {
    this.setState({ userName: value });
  }

  async handleUserCreation(event) {
    event.preventDefault();
    const { userName } = this.state;
    const { callback } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: userName });
    callback();
  }

  isInputValid(userName) {
    const minInputLength = 3;
    return userName.length < minInputLength;
  }

  render() {
    const { userName, isLoading } = this.state;
    const isLoginButtonDisabled = this.isInputValid(userName);
    return (
      <div data-testid="page-login">
        {!isLoading ? (
          <>
            <p>TrybeTunes</p>
            <form className="app-form" onSubmit={ this.handleUserCreation }>
              <input
                type="text"
                data-testid="login-name-input"
                value={ userName }
                onChange={ this.handleInputChange }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ isLoginButtonDisabled }
                onClick={ this.handleUserCreation }
              >
                Entrar
              </button>
            </form>
          </>
        ) : <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default Login;
