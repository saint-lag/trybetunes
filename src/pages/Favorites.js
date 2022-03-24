import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './pages-styles/favorites.css';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      loading: true,
      favorites: null,
      didFavoriteSongsApiReturned: false,
    };
    this.getUserRequest = this.getUserRequest.bind(this);
    this.getFavoriteSongsRequest = this.getFavoriteSongsRequest.bind(this);
    this.removeSongFromFavorites = this.removeSongFromFavorites.bind(this);
  }

  async componentDidMount() {
    await this.getUserRequest();
    await this.getFavoriteSongsRequest();
  }

  async getUserRequest() {
    this.setState({
      userName: await getUser().then((user) => user.name),
      loading: false,
    });
  }

  async getFavoriteSongsRequest() {
    this.setState({
      favorites: await getFavoriteSongs(),
      didFavoriteSongsApiReturned: true,
    });
  }

  removeSongFromFavorites(songId) {
    const { favorites } = this.state;
    this.setState({
      favorites: favorites.filter((songObj) => songObj.trackId !== songId),
    });
  }

  render() {
    const
      {
        favorites,
        userName,
        loading,
        didFavoriteSongsApiReturned,
      } = this.state;
    return (
      <main data-testid="page-favorites">
        {loading ? <Loading /> : <Header userName={ userName } />}
        <h1>Favorites:</h1>
        {didFavoriteSongsApiReturned ? (
          favorites.map((obj) => {
            const {
              trackId,
              trackName,
              previewUrl,
              trackExplicitness,
              trackNumber,
            } = obj;
            return (
              <MusicCard
                key={ `favorite-song-${trackId}` }
                trackId={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackExplicitness={ trackExplicitness }
                trackNumber={ trackNumber }
                isFavorite
                removeSongFromFavorites={ this.removeSongFromFavorites }
              />
            );
          })
        ) : (
          <Loading />
        )}
      </main>
    );
  }
}

export default Favorites;
