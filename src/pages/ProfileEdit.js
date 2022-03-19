import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      loading: true,
      userName: null,
      userEmail: null,
      userImage: null,
      userDescription: null,
      btnDisabled: true,
      lengthTracker: {
        nameInput: false,
        emailInput: false,
        imageInput: false,
        descriptionInput: false },
    };
    this.getUserRequest = this.getUserRequest.bind(this);
    this.inputLengthTracker = this.inputLengthTracker.bind(this);
  }

  async componentDidMount() {
    await this.getUserRequest();
  }

  async getUserRequest() {
    this.setState({
      userName: await getUser().then((user) => user.name),
      userName: await getUser().then((user) => user.name),
      userEmail: await getUser().then((user) => user.email),
      userImage: await getUser().then((user) => user.image),
      userDescription: await getUser().then((user) => user.description),
      loading: false,
    });
  }

  inputLengthTracker(event) {
    const MINIMUN_INPUT_LENGTH = 1;
    const { lengthTracker } = this.state;
    const { name, value } = event.target;
    lengthTracker[name] = value.length >= MINIMUN_INPUT_LENGTH;
    this.setState({
      lengthTracker,
      btnDisabled: !Object.values(lengthTracker).every((bool) => bool === true),
    });
  }

  render() {
    const {
      userName,
      userEmail,
      userDescription,
      userImage,
      loading,
      btnDisabled,
    } = this.state;
    return (
      <main data-testid="page-profile-edit">
        {loading ? <Loading /> : <Header userName={ userName } />}
        {loading ? (
          <Loading />
        ) : (
          <>
            <img
              data-testid="profile-image"
              src={ userImage }
              alt={ `${userName}-avatar` }
            />
            <form>
              <label htmlFor="edit-input-image">
                Imagem:
                <input
                  id="edit-input-image"
                  data-testid="edit-input-image"
                  onChange={ this.inputLengthTracker }
                  name="imageInput"
                />
              </label>
              <label htmlFor="edit-input-name">
                Nome:
                <input
                  id="edit-input-name"
                  data-testid="edit-input-name"
                  onChange={ this.inputLengthTracker }
                  name="nameInput"
                />
              </label>
              <label htmlFor="edit-input-email">
                Email:
                <input
                  id="edit-input-email"
                  data-testid="edit-input-email"
                  onChange={ this.inputLengthTracker }
                  name="emailInput"
                />
              </label>
              <label htmlFor="edit-input-description">
                Descrição
                <input
                  id="edit-input-description"
                  data-testid="edit-input-description"
                  onChange={ this.inputLengthTracker }
                  name="descriptionInput"
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="submit"
                disabled={ btnDisabled }
              >
                Salvar
              </button>
            </form>
          </>
        )}
      </main>
    );
  }
}

export default ProfileEdit;
