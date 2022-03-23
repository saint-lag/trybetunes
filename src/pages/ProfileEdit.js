import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      calledApi: false,
      userData: {
        nameInput: '',
        emailInput: '',
        imageInput: '',
        descriptionInput: '',
      },
      loading: true,
      btnDisabled: true,
      lengthTracker: {
        nameInput: false,
        emailInput: false,
        imageInput: false,
        descriptionInput: false,
      },
    };
    this.getUserRequest = this.getUserRequest.bind(this);
    this.inputLengthTracker = this.inputLengthTracker.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.updateUserRequest = this.updateUserRequest.bind(this);
    this.checksUserData = this.checksUserData.bind(this);
  }

  async componentDidMount() {
    await this.getUserRequest();
    this.checksUserData();
  }

  async getUserRequest() {
    const { name, image, email, description } = await getUser();
    this.setState({
      userName: name,
      userImage: image,
      userEmail: email,
      userDescription: description,
      userData: {
        nameInput: name,
        emailInput: email,
        imageInput: image,
        descriptionInput: description,
      },
      loading: false,
    });
  }

  checksUserData() {
    const { userName, userImage, userDescription, userEmail } = this.state;
    const MINIMUN_INPUT_LENGTH = 1;
    this.setState(
      {
        lengthTracker: {
          nameInput: userName.length >= MINIMUN_INPUT_LENGTH,
          emailInput: userEmail.match(
            /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          ),
          imageInput: userImage.length >= MINIMUN_INPUT_LENGTH,
          descriptionInput: userDescription.length >= MINIMUN_INPUT_LENGTH,
        },
      },
      async () => {
        const { lengthTracker } = this.state;
        this.setState({
          btnDisabled: !Object.values(lengthTracker).every(
            (bool) => bool === true,
          ),
        });
      },
    );
  }

  inputHandler(event) {
    const { name, value } = event.target;
    const { userData } = this.state;
    userData[name] = value;
    this.setState({
      userData,
    });
    this.inputLengthTracker(event);
  }

  inputLengthTracker(event) {
    const { lengthTracker } = this.state;
    const { name, value } = event.target;
    if (name === 'emailInput') {
      const emailVerified = value.match(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      );
      lengthTracker[name] = emailVerified;
      this.setState({
        lengthTracker,
        btnDisabled: !Object.values(lengthTracker).every(
          (bool) => bool === true,
        ),
      });
    }
    if (name !== 'emailInput') {
      const MINIMUN_INPUT_LENGTH = 1;
      lengthTracker[name] = value.length >= MINIMUN_INPUT_LENGTH;
      this.setState({
        lengthTracker,
        btnDisabled: !Object.values(lengthTracker).every(
          (bool) => bool === true,
        ),
      });
    }
  }

  updateUserRequest(event) {
    event.preventDefault();
    this.setState({
      didApiReturn: false, calledApi: true }, async () => {
      const { userData } = this.state;
      const { nameInput, imageInput, descriptionInput, emailInput } = userData;
      await updateUser({
        name: nameInput,
        email: emailInput,
        image: imageInput,
        description: descriptionInput,
      });
      this.setState({
        didApiReturn: true,
      });
    });
  }

  render() {
    const {
      userName,
      userImage,
      userEmail,
      userDescription,
      loading,
      btnDisabled,
      calledApi,
      didApiReturn,
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
                  onChange={ this.inputHandler }
                  name="imageInput"
                  defaultValue={ userImage }
                />
              </label>
              <label htmlFor="edit-input-name">
                Nome:
                <input
                  id="edit-input-name"
                  data-testid="edit-input-name"
                  onChange={ this.inputHandler }
                  name="nameInput"
                  defaultValue={ userName }
                />
              </label>
              <label htmlFor="edit-input-email">
                Email:
                <input
                  id="edit-input-email"
                  data-testid="edit-input-email"
                  onChange={ this.inputHandler }
                  name="emailInput"
                  defaultValue={ userEmail }
                />
              </label>
              <label htmlFor="edit-input-description">
                Descrição
                <input
                  id="edit-input-description"
                  data-testid="edit-input-description"
                  onChange={ this.inputHandler }
                  name="descriptionInput"
                  defaultValue={ userDescription }
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="submit"
                disabled={ btnDisabled }
                onClick={ this.updateUserRequest }
              >
                Salvar
              </button>
            </form>
          </>
        )}
        {calledApi && (didApiReturn ? <Redirect to="/profile" /> : <Loading />)}
      </main>
    );
  }
}

export default ProfileEdit;
