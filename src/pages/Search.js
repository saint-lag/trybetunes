import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      loading: true,
      btnDisabled: true,
    };
    this.inputLengthTracker = this.inputLengthTracker.bind(this);
  }

  async componentDidMount() {
    this.setState({
      userName: await getUser().then((user) => user.name),
      loading: false,
    });
  }

  inputLengthTracker(event) {
    const { value } = event.target;
    const MINIMUN_INPUT_LENGTH = 2;
    this.setState({
      btnDisabled: value.length < MINIMUN_INPUT_LENGTH,
    });
  }

  render() {
    const { inputLengthTracker } = this;
    const { userName, loading, btnDisabled } = this.state;
    return (
      <main data-testid="page-search">
        {loading ? <Loading /> : <Header userName={ userName } />}
        <h1>Search</h1>
        <form id="search-form">
          <input
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ inputLengthTracker }
          />
          <button
            data-testid="search-artist-button"
            disabled={ btnDisabled }
            id="search-artist-button"
            type="button"
          >
            Procurar
          </button>
        </form>
      </main>
    );
  }
}

export default Search;
