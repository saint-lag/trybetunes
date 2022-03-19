import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      loading: true,
    };
    this.getUserRequest = this.getUserRequest.bind(this);
  }

  async componentDidMount() {
    await this.getUserRequest();
  }

  async getUserRequest() {
    this.setState({
      userName: await getUser().then((user) => user.name),
      userEmail: await getUser().then((user) => user.email),
      userImage: await getUser().then((user) => user.image),
      userDescription: await getUser().then((user) => user.description),
      loading: false,
    });
  }

  render() {
    const { userName, userEmail, userDescription, userImage, loading } = this.state;
    return (
      <main data-testid="page-profile">
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
            <Link to="profile/edit">Editar Perfil</Link>
            <h2>Nome</h2>
            <h3>{userName}</h3>
            <h2>E-mail</h2>
            <h3>{userEmail}</h3>
            <h2>Descrição</h2>
            <h3>{userDescription}</h3>
          </>
        )}
      </main>
    );
  }
}

export default Profile;
