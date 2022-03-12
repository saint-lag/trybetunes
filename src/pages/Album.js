import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Album extends React.Component {
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
      <main data-testid="page-album">
        {loading ? <Loading /> : <Header userName={ userName } />}
        <h1>Album</h1>
      </main>
    );
  }
}

export default Album;
