import React from 'react';
import PropTypes from 'prop-types';
import './pages-styles/login.css';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      userName: '',
    };
    this.inputLengthTracker = this.inputLengthTracker.bind(this);
    this.createUserLocal = this.createUserLocal.bind(this);
  }

  async createUserLocal() {
    const { userName } = this.state;
    const { loadingStateHandler, redirectHandler } = this.props;
    loadingStateHandler(true);
    await createUser({ name: userName });
    redirectHandler('/search');
    loadingStateHandler(false);
  }

  inputLengthTracker(event) {
    const { value } = event.target;
    const MINIMUN_INPUT_LENGTH = 3;
    this.setState({
      btnDisabled: value.length < MINIMUN_INPUT_LENGTH,
      userName: value,
    });
  }

  render() {
    const { inputLengthTracker, createUserLocal } = this;
    const { btnDisabled } = this.state;
    return (
      <div data-testid="page-login" id="page-login" className="div-flexbox">
        <img alt="trybe-tunes-logo" />
        <form>
          <input
            data-testid="login-name-input"
            id="name-input"
            placeholder="name"
            onChange={ inputLengthTracker }
          />
          <button
            id="login-button"
            data-testid="login-submit-button"
            type="button"
            disabled={ btnDisabled }
            onClick={ createUserLocal }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loadingStateHandler: PropTypes.func.isRequired,
  redirectHandler: PropTypes.func.isRequired,
};

export default Login;
