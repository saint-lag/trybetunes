import React from 'react';
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
  }

  async componentDidMount() {
    this.setState({
      userName: await getUser().then((user) => user.name),
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <main data-testid="page-profile">
        {loading ? <Loading /> : <Header userName={ userName } />}
        <h1>Profile</h1>
      </main>
    );
  }
}

export default Profile;
