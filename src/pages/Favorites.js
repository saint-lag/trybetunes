import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import getMusics from '../services/musicsAPI';
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
      favoriteSongsObj: [],
    };
    this.getUserRequest = this.getUserRequest.bind(this);
    this.getFavoriteSongsRequest = this.getFavoriteSongsRequest.bind(this);
    this.getFavoriteSongsObj = this.getFavoriteSongsObj.bind(this);
    this.removeSongFromFavorites = this.removeSongFromFavorites.bind(this);
  }

  async componentDidMount() {
    await this.getUserRequest();
    await this.getFavoriteSongsRequest();
    await this.getFavoriteSongsObj();
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
    });
  }

  async getFavoriteSongsObj() {
    const { favorites } = this.state;
    console.log(favorites);
    this.setState({
      favoriteSongsObj: favorites.length !== 0 ? [...(await getMusics(favorites))] : [],
      didFavoriteSongsApiReturned: true,
    });
  }

  removeSongFromFavorites(songId) {
    const { favorites } = this.state;
    this.setState({
      favorites: favorites.filter((id) => id !== songId),
    }, async () => this.getFavoriteSongsObj());
  }

  render() {
    const
      {
        userName,
        loading,
        favoriteSongsObj,
        didFavoriteSongsApiReturned,
      } = this.state;
    return (
      <main data-testid="page-favorites">
        {loading ? <Loading /> : <Header userName={ userName } />}
        <h1>Favorites:</h1>
        {didFavoriteSongsApiReturned ? (
          favoriteSongsObj.map((obj) => {
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
