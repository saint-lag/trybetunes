import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Albums from '../components/Albums';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      loading: true,
      btnDisabled: true,
      artistQuery: null,
      isSearching: false,
      hasClicked: false,
    };
    this.searchArtistInput = React.createRef();
    this.inputLengthTracker = this.inputLengthTracker.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.didApiReturned = this.didApiReturned.bind(this);
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

  clickHandler() {
    const artistQuery = this.searchArtistInput.current.value;
    this.searchArtistInput.current.value = '';
    this.setState({
      artistQuery,
      btnDisabled: true,
      isSearching: true,
      hasClicked: true,
    });
  }

  didApiReturned(bool) {
    this.setState({
      isSearching: !bool,
    });
  }

  render() {
    const { inputLengthTracker, clickHandler, didApiReturned } = this;
    const {
      userName,
      loading,
      btnDisabled,
      isSearching,
      hasClicked,
      artistQuery,
    } = this.state;
    return (
      <main data-testid="page-search">
        {loading ? <Loading /> : <Header userName={ userName } />}
        <h1>Search</h1>
        <form id="search-form">
          {isSearching ? (
            <Loading />
          ) : (
            <>
              <input
                data-testid="search-artist-input"
                ref={ this.searchArtistInput }
                placeholder="Nome do Artista"
                onChange={ inputLengthTracker }
              />
              <button
                data-testid="search-artist-button"
                disabled={ btnDisabled }
                id="search-artist-button"
                type="button"
                onClick={ clickHandler }
              >
                Procurar
              </button>
            </>
          )}
        </form>
        {hasClicked && (
          <>
            <h2>
              Resultado de álbuns de:
              {' '}
              {artistQuery}
            </h2>
            <Albums didApiReturned={ didApiReturned } artistQuery={ artistQuery } />
          </>
        )}
      </main>
    );
  }
}

export default Search;
